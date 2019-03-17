import React from 'react';

const checkbox =(props) => {
  return(
    <input type="radio" onChange={(event)=>props.change(event)} name={props.name} checked={props.checked} />
  )
}
export default checkbox;
