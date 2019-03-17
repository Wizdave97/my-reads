import React from 'react';
import Back from '../../UI/Back';
import classes from './searchInput.module.css'
import { Link } from 'react-router-dom';

const searchInput = (props) => {
  return(
    <div className={classes['search-container']}>
      <Link to="/"><Back classes={classes['back-button']}/></Link>
      <input value={props.query}  className={classes['search-books']} placeholder="Search Books" onChange={(event)=> props.updateQuery(event)}/>
    </div>
  )
}
export default searchInput;
