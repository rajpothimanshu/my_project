import React from 'react'
import '../Css/RadioComponent.css'

const RadioComponent = ({text,changeSelect,data }) => {
  const handlehecked=(val)=>{
    changeSelect(val);

  }
  return (
    <div name={text} 
    className={`form-check ${data === text ? "active" : "inactive"}`} 
    onClick={()=>{handlehecked(text)}}>
        <span className='text'>{text}</span>
      
    </div>
  )
}

export default RadioComponent
