// import React, { useContext, useEffect } from 'react'
// import { seats } from '../data'
// import '../Css/LastBookingDetails.css'
// import BsContext from '../Context/BsContext'


// const LastBookingDetails = () => {
//   const context = useContext(BsContext);

//   const { lastBooking, handleGetBooking } = context;
//   useEffect(() => {
//     handleGetBooking()

//   }, []);

//   console.log("lastBooking" , lastBooking)

//   return (
//     <div className='last_booking_details_container_main'>
//       <h2 className='last_booking_details_header'>Last Booking : </h2>

//       {
//         lastBooking ? (
//           <>
//             <div className='seats_container'>
//               <p className='seat_header'>Seats:</p>
//               <ul className='seats'>
//                 {seats.map((seat, index) => (
//                   <li className='seats_value' key={index}>
//                     const seatValue = lastBooking.seats[seat];
//                     return(
//                       seatValue && seatValue !=="0" && (
                        
//                       )
//                     )
//                   </li>
//                 ))}

//               </ul>
//             </div>


//             {lastBooking ? (
//         <>
//           <div className='seats_container'>
//             <p className='seat_header'>Seats:</p>
//             <ul className='seats'>
//               {seats.map((seat, index) => {
//                 const seatValue = lastBooking.seats[seat];
//                 return (
//                   seatValue && seatValue !== "0" && (
//                     <li className='seats_value' key={index}>
//                       {seat}: {seatValue}
//                     </li>
//                   )
//                 )
//               })}
//             </ul>
//           </div>
//             <p className='slots' style={{ textAlign: "left" }}> Slot  : <span>{lastBooking.movie || lastBooking.movieName}</span></p>
//             <p className='movie' style={{ textAlign: "left" }}> Movie : <span>{lastBooking.movieName}</span></p>

//           </>
//         ) : (
//           <p className='no_previous'>No Previous Booking</p>
//         )
//       }

//     </div>
//   )
// }

// export default LastBookingDetails
















import React, { useContext, useEffect } from 'react';
import { seats } from '../data';
import '../Css/LastBookingDetails.css';
import BsContext from '../Context/BsContext';

const LastBookingDetails = () => {
  const { lastBooking, handleGetBooking } = useContext(BsContext);

  useEffect(() => {
    handleGetBooking();
  }, []);

  console.log("lastBooking:", lastBooking);

  return (
    <div className='last_booking_details_container_main'>
      <h2 className='last_booking_details_header'>Last Booking :</h2>

      {lastBooking ? (
        <>
          <div className='seats_container'>
            <p className='seat_header'>Seats:</p>
            <ul className='seats'>
              {seats.map((seat, index) => {
                const seatValue = lastBooking.seats[seat];
                return (
                  seatValue && Number(seatValue) > 0 && (
                    <li className='seats_value' key={index}>
                      {seat}: {seatValue}
                    </li>
                  )
                );
              })}
            </ul>
          </div>

          <p className='slots' style={{ textAlign: "left" }}>
            Slot : <span>{lastBooking.slot}</span>
          </p>

          <p className='movie' style={{ textAlign: "left" }}>
            Movie : <span>{lastBooking.movie}</span>
          </p>
        </>
      ) : (
        <p className='no_previous'>No Previous Booking</p>
      )}
    </div>
  );
};

export default LastBookingDetails;
