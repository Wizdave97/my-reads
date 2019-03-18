import React from 'react';
import classes from './modal.module.css';
import Checkbox from './Checkbox';

const modal =(props)=> {
  let style="";
  let checkboxes=null
  if(props){
     style=props.modalShow?{display:'block'}:{display:'none'}
  }
  const options=['None','Read','want to Read','Currently Reading'];
  const shelfNames=['none','read','wantToRead','currentlyReading'];
  if(props){
    if(props.checkboxes){
      checkboxes=props.checkboxes;
      return(
        <div ref={modal} className={classes.modal} style={style}>
          <ul role="listgroup">
            {options.map((option,index)=>{
              return (<li key={index}><Checkbox change={props.change} name={shelfNames[index]} checked={checkboxes[shelfNames[index]]}/>{option}</li>)
            })}
          </ul>
        </div>

      )
    }

  }

}
export default modal;
