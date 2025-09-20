import React, { useContext } from 'react'
import { slots } from '../data'
import RadioComponent from './RadioComponent'
import '../Css/TimeSechdule.css';
import BsContext from '../Context/BsContext';

const TimeSechdule = () => {
  const context = useContext(BsContext);

  const {time,changeTime} = context

  const handleChangeItem = (val) => {
    changeTime(val);

    window.localStorage.setItem("slot",val)
  }
  return (
    <>
    
    <div className='slot_container'>
      <h1 className='TS_heading'>Select a Sechdule</h1>
      <div className='TS_main_container'>
         {slots.map((el,index) =>{
            return(
                <RadioComponent text={el} key={index} data={time} 
                changeSelect={handleChangeItem} />
            )
        })}
      </div>
    </div>
    </>
  )
}

export default TimeSechdule
