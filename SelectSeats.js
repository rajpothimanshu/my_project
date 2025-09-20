import React, { useContext } from 'react'
import { seats } from '../data'
import SeatsNumber from './SeatsNumber'
import '../Css/SelectSeats.css'
import BsContext from '../Context/BsContext'; 


const SelectSeats = () => {
  const context = useContext(BsContext);

  const { noOfSeat, changenoOfSeat } = context;


  return (
    <div className='SS_wrapper'>
      <h1 className='SS_heading'>Select Sheat</h1>
      <div className='SS_main_container'>
      {seats.map((el,index) =>{
            return(
                <SeatsNumber text={el} key={index} data={noOfSeat} changeSelect={changenoOfSeat}/>
            )
        })}
        </div>
    </div>
  )
}

export default SelectSeats
