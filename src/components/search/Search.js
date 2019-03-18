import React from 'react';
import classes from './search.module.css';
import SearchInput from './searchInput/SearchInput';
import Book from '../book/Book';
import { search, update, getAll } from '../../BooksAPI';


class Search extends React.Component {
  state={
    query:'',
    books:[],
    networkError:false
  }
  onUpdateQuery=(event)=>{
    let query=event.target.value;
    this.setState({
      query:query.trim()
    })
    search(this.state.query.trim()).then(books=>{
      if(books==undefined || books.error) return

      getAll().then(libbooks=>{
        for(let book of books ){
          for(let libbook of libbooks){
            if(book.id==libbook.id){
              book.shelf=libbook.shelf
              break;
            }
            else(book.shelf='none')
          }
        }
        this.setState({
          books:books
        })
      })
    })
  }
  render(){
    let results=null;
    let networkError,pending,shelfs;
    if(this.state.pending){
      pending=(<h3 style={{textAlign:'center'}}>Loading...</h3>);
    }
    else if(this.state.networkError){
      networkError=(<h3 style={{textAlign:'center'}}>A network Error Occured!!! Check your internet connection and try again</h3>);
    }
    if(this.state.query && this.state.books!==undefined && this.state.books.length!==0){
      results=(<div className={classes.results}>{
        this.state.books?this.state.books.map(book=>{
          return <Book key={book.id} book={book} update={update}/>
        }):''
      }</div>)
    }
    return(

      <div className={classes.container}>
         <SearchInput query={this.state.query} updateQuery={this.onUpdateQuery}/>
         {results}
         {networkError}
      </div>


    )
  }
}

export default Search;
