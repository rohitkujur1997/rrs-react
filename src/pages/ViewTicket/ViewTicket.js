import { React, useState, useEffect } from "react";
import axios from "axios";

function ViewTicket(props) {
  const [Data, setData] = useState([])

  const axiosJWT = axios.create();
  useEffect(() => {
    axiosJWT.get(`${process.env.REACT_APP_URL}/api/UserReservation/viewticketbypnr/${props.pnr}`, {
      headers: {
        authorization: "Bearer " + localStorage.getItem('Token')
      }
    })
      .then(function (response) {
        console.log(response)
        setData(response.data[0])

      })
  }, [])
  return (
    <form className="Userform">
      <h1>YOUR TICKET</h1>
      <h5>PNR: {Data.pnr}</h5>
      <h5>TrainNumber: {Data.trainNumber}</h5>
      <h5>JourneyDate: {Data.journeyDate}</h5>
      <h5>UserName: {Data.userName}</h5>
      <h5>NumberOfTickets: {Data.numberOfTickets}</h5>
      <h5>Payment: {Data.payment}</h5>
      <h5>TravelClass: {Data.class}</h5>
      <h5>TravelQuota: {Data.quota}</h5>
      <h5>Email: {Data.email}</h5>
      <br />
    </form>

  )
}

export default ViewTicket