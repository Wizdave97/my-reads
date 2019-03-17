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

  showModalHandler=()=>{
    this.setState(state=>({
      modalShow:!state.modalShow
    }))
  }
  onCheckboxSelect=(event)=>{
    const name=event.target.name;
    let checkboxes=this.state.checkboxes;
    Object.keys(checkboxes).map(key=>{
      checkboxes[key]=false;
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
          <img src={this.props.book.imageLinks.thumbnail} alt={this.props.book.title}/>
          <div className={classes.details}>
            <p>{this.props.book.title}</p>
            <p>{this.props.book.authors[0]}</p>
          </div>
          <div className={classes.dropdown} role='button' onClick={()=> this.showModalHandler()}><DropDown /></div>
          <Modal  modalShow={this.state.modalShow} checkboxes={this.state.checkboxes} change={this.onCheckboxSelect}/>
        </div>

    )
  }


}

export default Book;
