import React  from 'react';
import classes from './shelf.module.css';
import Book from '../book/Book';


const shelf = (props) => {

  let renderValue=null;
  if(props.books){
    renderValue=props.books.map(book=>{
      return <Book getBooks={props.getBooks} update={props.update} key={book.id} book={book}/>
      })
  }
  return(
    <div className={classes.shelf}>
      <div className={classes.header}><h3 className={classes.title}>{props.title}</h3></div>
      <div className={classes.books}>
        {renderValue}
      </div>
    </div>

  )
}

export default shelf;
