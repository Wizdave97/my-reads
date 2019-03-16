import React from 'react';
import classes from './book.module.css';
import DropDown from '../UI/DropDownIcon'

const book =(props) =>{
  return (
      <div className={classes.book}>
        <img src={props.book.imageLinks.thumbnail} alt={props.book.title}/>
        <div className={classes.details}>
          <p>{props.book.title}</p>
          <p>{props.book.authors[0]}</p>
        </div>
        <div className={classes.dropdown} role={'button'}><DropDown /></div>
      </div>
  )
}

export default book;
