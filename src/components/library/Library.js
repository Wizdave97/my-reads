import React, { Component } from 'react';
import classes from './library.module.css';
import { getAll, update } from '../../BooksAPI';
import Shelf from '../shelf/Shelf';


class Library extends Component {
  state={
    currentlyReading:[],
    read:[],
    wantToRead:[],
    networkError:false,
    pending:true
  }
  updateBooks=(book,shelf)=>{
    return update(book,shelf).then(res=>{
      getAll().then(books=>{
        let currentlyReading=[], read=[], wantToRead=[];
        for(let book of books){
          if(book.shelf==='read'){
            read.push(book)
          }
          else if(book.shelf==='currentlyReading'){
            currentlyReading.push(book)
          }
          else if(book.shelf==='wantToRead'){
            wantToRead.push(book)
          }
        }

        this.setState({
          currentlyReading:currentlyReading,
          read:read,
          wantToRead:wantToRead
        })
      }).catch(error=>{
        this.setState(state=>({
          networkError:!state.networkError,
          pending:!state.pending
        }))
      })

    })
  }
  getBooks=()=>{
    getAll().then(books=>{
      let currentlyReading=[], read=[], wantToRead=[];
      for(let book of books){
        if(book.shelf==='read'){
          read.push(book)
        }
        else if(book.shelf==='currentlyReading'){
          currentlyReading.push(book)
        }
        else if(book.shelf==='wantToRead'){
          wantToRead.push(book)
        }
      }

      this.setState({
        pending:!this.state.pending,
        currentlyReading:currentlyReading,
        read:read,
        wantToRead:wantToRead
      })
    }).catch(error=>{
      this.setState(state=>({
        networkError:!state.networkError,
        pending:!state.pending
      }))
    })
  }
  componentDidMount() {
    this.getBooks()
    }
  render() {

    let networkError,pending,shelfs;
    if(this.state.pending){
      pending=(<h3 style={{textAlign:'center'}}>Loading...</h3>);
    }
    else if(this.state.networkError){
      networkError=(<h3 style={{textAlign:'center'}}>A network Error Occured!!! Check your internet connection and try again</h3>);
    }
    else if(!this.state.networkError && !this.state.pending){
      shelfs=(
            <React.Fragment>
              <Shelf update={this.updateBooks} getBooks={this.getBooks} books={this.state.currentlyReading} title={'Currently Reading'}/>
              <Shelf update={this.updateBooks} getBooks={this.getBooks} books={this.state.read} title={'Read'}/>
              <Shelf update={this.updateBooks} getBooks={this.getBooks} books={this.state.wantToRead} title={'Want to Read'}/>
            </React.Fragment>
          )
    }




    return(

      <div className={classes.main}>
        <nav className={classes.navbar}>
          <h2>My Library</h2>
        </nav>
        <div className={classes.content}>
        {pending}
        {networkError}
        {shelfs}
        </div>
      </div>

    )
  }
}
export default Library;
