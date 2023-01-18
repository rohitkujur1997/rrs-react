import { React, useState, useEffect } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import './UserReservationTicket.css';

function UserReservationTicket() {
  const navigate = useNavigate();
  const [Data, setData] = useState([])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/api/UserReservation/viewticketdetails/${localStorage.getItem('UserName')}`)
      .then(function (response) {
        console.log(response)
        setData(response.data[0])

      })
  },[])
  function logout(){
    localStorage.removeItem("TrainNumber");
    localStorage.removeItem("PNR");
    localStorage.removeItem("UserName");
    localStorage.removeItem("UserLogin");
    navigate("/");
  }
  return (
    <div className="ticket">
      
      <form >
      <h1>YOUR TICKET</h1>
        <h5>PNR:{Data.pnr}</h5>
        <h5>TrainNumber:{Data.trainNumber}</h5>
        <h5>BookingDate:{Data.bookingDate}</h5>
        <h5>JourneyDate:{Data.journeyDate}</h5>
        <h5>UserName:{Data.userName}</h5>
        <h5>NumberOfTickets:{Data.numberOfTickets}</h5>
        <h5>Gender:{Data.gender}</h5>
        <h5>Age:{Data.age}</h5>
        <h5>Payment:{Data.payment}</h5>
        <h5>TravelClass:{Data.travelClass}</h5>
        <br/>
      <button className="btn" onClick={() => navigate("/CancelTicket")}>PREVIOUS TICKET</button>
      <button className="btn" onClick={()=>logout()}>LOGOUT</button>
      </form>
    </div>
  )
}

export default UserReservationTicket