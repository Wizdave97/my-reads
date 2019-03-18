import React, { Component } from 'react';
import classes from './book.module.css';
import DropDown from '../UI/DropDownIcon';
import Modal from '../UI/Modal';

const shelves=['currentlyReading','read','wantToRead']
class Book extends Component {

  state={
    modalShow:false,
    checkboxes:{CurrentlyReading:false,read:false,none:false,wantToRead:false}
  }
  componentDidMount(){
    /*
    Add the correct state of the shelf for the book instance
    */
    if(!shelves.includes(this.props.book.shelf)){
      this.setState(state=>({
        checkboxes:{
          ...state.checkboxes,
          ['none']:true
        }
      }))
      return
    }
    this.setState(state=>({
      checkboxes:{
        ...state.checkboxes,
        [this.props.book.shelf]:true
      }
    }))
  }
  // Function to show modal that hold info about the shelve the book is currently on
  showModalHandler=()=>{
    this.setState(state=>({
      modalShow:!state.modalShow
    }))
  }
  //handler that controls when a checkbox is selected by ensuring only one checkbox is selected at a time
  onCheckboxSelect=(event)=>{
    const name=event.target.name;
    let checkboxes=this.state.checkboxes;
    Object.keys(checkboxes).map(key=>{
      return checkboxes[key]=false;
    })
    checkboxes[name]=true
    this.setState({
      checkboxes:checkboxes
    })
    this.props.update(this.props.book,name)
  }
  render(){
    return (

        <div className={classes.book}>
          <img src={this.props.book.imageLinks?this.props.book.imageLinks.thumbnail:''} alt={this.props.book.title?this.props.book.title:''}/>
          <div className={classes.details}>
            <p>{this.props.book.title?this.props.book.title:''}</p>
            <p><strong>{this.props.book.authors?this.props.book.authors[0]:''}</strong></p>
          </div>
          <div className={classes.dropdown} role='button' tabIndex="0" onClick={()=> this.showModalHandler()}><DropDown /></div>
          <Modal  modalShow={this.state.modalShow} checkboxes={this.state.checkboxes} change={this.onCheckboxSelect}/>
        </div>

    )
  }


}

export default Book;
