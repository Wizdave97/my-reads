import React from 'react';
import BackIcon from '../../icons/arrow-back.svg';

const back =(props) => {
  return(
    <div className={props.classes}>
      <img src={BackIcon} alt='Back Button' style={{width:'60px',height:'60px',float:'left'}}/>
    </div>

  )
}
export default back;
