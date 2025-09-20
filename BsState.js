// import { useEffect, useState } from "react";
// import BsContext from "./BsContext";

// const BsState = (props) => {
//     const [errorPopup, setErrorPopup] = useState(false)

//     const [errorMessage, setErrorMessage] = useState("")
//     const [movie, changeMovie] = useState('');

//     const [time, changeTime] = useState('');

//     const [noOfSeat, changenoOfSeat] = useState({
//         A1: "",
//         A2: "",
//         A3: "",
//         A4: "",
//         D1: "",
//         D2: "",
//     });

//     const [lastBooking, setlastBooking] = useState(null);

//     // const handlePostBooking = async () => {
//     //     const response = await fetch(`http://localhost:8080/api/booking`, {
//     //         method: "POST",
//     //         headers: {
//     //             "Content-Type": "application/json"
//     //         },
//     //         body: JSON.stringify({ movie: movie, slot: time, seat: noOfSeat }),
//     //     })

//     //     const data = await response.json();

//     //     setErrorPopup(true);
//     //     setErrorMessage(data.message);


//     //     if (response.status === 200) {
//     //         changeTime("")
//     //         changeMovie("")

//     //         setlastBooking(data.data)

//     //         window.localStorage.clear();
//     //     }
//     // }

//     // const handleGetBooking = async () => {
//     //     const response = await fetch(`http://localhost:8080/api/booking`, {
//     //         method: "GET",
//     //     })

//     //     const data = await response.json();

//     //     setlastBooking(data.data)

//     // }

//     const handlePostBooking = async () => {
//     try {
//         const response = await fetch(`http://localhost:8080/api/booking`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ movieName: movie, slot: time, seats: noOfSeat }),
//         });

//         const data = await response.json();

//         setErrorPopup(true);
//         setErrorMessage(data.message);

//         if (response.status === 200) {
//             changeTime("");
//             changeMovie("");
//             changenoOfSeat({ A1: "", A2: "", A3: "", A4: "", D1: "", D2: "" });
//             setlastBooking(data.data);
//             window.localStorage.clear();
//         }
//     } catch (err) {
//         console.error("Failed to post booking:", err);
//         setErrorPopup(true);
//         setErrorMessage("Server not reachable!");
//     }
// };

// const handleGetBooking = async () => {
//     try {
//         const response = await fetch(`http://localhost:8080/api/booking`, { method: "GET" });
//         const data = await response.json();
//         setlastBooking(data.data);
//     } catch (err) {
//         console.error("Failed to fetch booking:", err);
//         setErrorPopup(true);
//         setErrorMessage("Server not reachable!");
//     }
// };


//     useEffect(() => {
//         const movie = window.localStorage.getItem("movie")
//         const slot = window.localStorage.getItem("slot")
//         const seats = JSON.parse(window.localStorage.getItem("seat"))

//         if(movie){
//             changeMovie(movie)
//         }
//         if (slot) {
//             changeTime(slot)
//         }
//         if (seats) {
//             changenoOfSeat(seats)
//         }
//     }, [])

//     return (
//         <BsContext.Provider value={{ 
//              movie, changeMovie,
//              time, changeTime, 
//              noOfSeat, changenoOfSeat, 
//              lastBooking, setlastBooking, 
//              handleGetBooking, handlePostBooking, 
//              errorPopup, setErrorPopup, 
//              errorMessage, setErrorMessage 
//             }}>
//                 {props.children}</BsContext.Provider>
//     )
// }

// export default BsState;



import { useEffect, useState } from "react";
import BsContext from "./BsContext";

const BsState = (props) => {
  const [errorPopup, setErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [movie, changeMovie] = useState("");
  const [time, changeTime] = useState("");
  const [noOfSeat, changenoOfSeat] = useState({
    A1: "",
    A2: "",
    A3: "",
    A4: "",
    D1: "",
    D2: "",
  });

  const [lastBooking, setlastBooking] = useState(null);

  // ✅ Save booking to API + localStorage
  const handlePostBooking = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movie: movie,   // 👈 keep consistent with localStorage
          slot: time,
          seats: noOfSeat,
        }),
      });

      const data = await response.json();
      setErrorPopup(true);
      setErrorMessage(data.message);

      if (response.status === 200) {
        // Reset inputs
        changeTime("");
        changeMovie("");
        changenoOfSeat({ A1: "", A2: "", A3: "", A4: "", D1: "", D2: "" });

        // Save booking both in state + localStorage
        const bookingData = {
          movie: data.data.movie || movie,
          slot: data.data.slot || time,
          seats: data.data.seats || noOfSeat,
        };

        setlastBooking(bookingData);
        localStorage.setItem("lastBooking", JSON.stringify(bookingData));
      }
    } catch (err) {
      console.error("Failed to post booking:", err);
      setErrorPopup(true);
      setErrorMessage("Server not reachable!");
    }
  };

  // ✅ Get booking from API or fallback to localStorage
  const handleGetBooking = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/booking`, {
        method: "GET",
      });
      const data = await response.json();

      if (data.data) {
        setlastBooking(data.data);
        localStorage.setItem("lastBooking", JSON.stringify(data.data));
      }
    } catch (err) {
      console.error("Failed to fetch booking, using localStorage:", err);
      const booking = JSON.parse(localStorage.getItem("lastBooking"));
      if (booking) setlastBooking(booking);
    }
  };

  // ✅ Load data from localStorage for UI
  useEffect(() => {
    const movie = window.localStorage.getItem("movie");
    const slot = window.localStorage.getItem("slot");
    const seats = JSON.parse(window.localStorage.getItem("seat"));

    if (movie) changeMovie(movie);
    if (slot) changeTime(slot);
    if (seats) changenoOfSeat(seats);

    // also load lastBooking if saved
    const booking = JSON.parse(localStorage.getItem("lastBooking"));
    if (booking) setlastBooking(booking);
  }, []);

  return (
    <BsContext.Provider
      value={{
        movie,
        changeMovie,
        time,
        changeTime,
        noOfSeat,
        changenoOfSeat,
        lastBooking,
        setlastBooking,
        handleGetBooking,
        handlePostBooking,
        errorPopup,
        setErrorPopup,
        errorMessage,
        setErrorMessage,
      }}
    >
      {props.children}
    </BsContext.Provider>
  );
};

export default BsState;
