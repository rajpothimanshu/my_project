import React, { useContext } from 'react'
import SelectMovie from '../Components/SelectMovie'
import LastBookingDetails from '../Components/LastBookingDetails'
import TimeSechdule from '../Components/TimeSechdule'
import SelectSeats from '../Components/SelectSeats'
import '../Css/Home.css';
import BsContext from '../Context/BsContext'
import { slots } from '../data'

const Home = () => {

  const context =useContext(BsContext)
  const{
    movie,
    noOfSeat,
    handlePostBooking,
    setErrorMessage
  } = context;


  const handleBookNow = () => {
    if(!movie){
      setErrorMessage(true)
      setErrorMessage("Please select movie")
    }
    if(!slots){
      setErrorMessage(true)
      setErrorMessage("Please select slot")
    }
    if(!noOfSeat){
      setErrorMessage(true)
      setErrorMessage("Please select seat")
    }else{
      handlePostBooking();
    }
    
  }
  return (
    <div className='container'>
    <div className='wrapper'>
    <div className='select_movie_component'>
       <SelectMovie/>
    </div>
    <div className='last_booking_details_container'>
   <LastBookingDetails/>
    </div>
    </div>
    <div className='times_seats_container'>
        <TimeSechdule/>
        <SelectSeats/>
        <button className='BN-btn' onClick={()=>{handleBookNow()}} >Book Now</button>
    </div>



    </div>
    
  )
}

export default Home
