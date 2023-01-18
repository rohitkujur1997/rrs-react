import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './UserReservation.css';


function UserReservation(props) {
  const [NumberOfTickets, setNumberOfTickets] = useState(1);
  const [Payment, setPayment] = useState("");
  const [Email, setEmail] = useState("");
  const [buttonPress, setButtonPress] = useState(false);
  const [showerror, setShowerror] = useState('');

  const navigate = useNavigate();
  const axiosJWT = axios.create();

  const handleSubmit = (e) => {
    setButtonPress(true);
    const state = {
      TrainNumber: localStorage.getItem("TrainNumber"),
      Quota: localStorage.getItem("Quota"),
      Class: localStorage.getItem("Class"),
      JourneyDate: localStorage.getItem("JourneyDate"),
      UserName: localStorage.getItem("UserName"),
      NumberOfTickets: NumberOfTickets,
      Payment: Payment,
      Email: Email,
    };
    axiosJWT
      .post("https://localhost:7040/api/UserReservation/Reservation", state, {
        headers: {
          authorization: "Bearer " + localStorage.getItem('Token')
        }
      })
      .then((response) => {
        console.log(response.data);
        props.setTrigger(false);
      }).catch(function (error) {
        if (error.response.status === 401) {
          setShowerror("Unauthorized");
        }
        else {
          setShowerror(error.response.data);
        }
      });

    e.preventDefault();
  };
  const date = new Date().toLocaleDateString();
  return (
    // <div className="Login" >
    <form className="Userform" onSubmit={(e) => { handleSubmit(e); }}>
      <h2>RESERVATION FORM</h2>
      <div style={{ width: "100%", overflow: "hidden" }}>
        <div style={{ width: '50%', height: '100%', float: 'left' }}>
          <span class="details">Train Number</span>
          <input required type="text" defaultValue={localStorage.getItem("TrainNumber")} readOnly />
          <span class="details">Quota</span>
          <input required type="text" defaultValue={localStorage.getItem("Quota")} readOnly />
          <span class="details">Number of tickets:{NumberOfTickets}</span><br />
          <input required type="range" min="1" max="6" defaultValue="1" onChange={(e) => setNumberOfTickets(e.target.value)}></input>
          {/* <input required name="NumberOfTickets" type="number" min="1" max="6" onChange={(event) => setNumberOfTickets(event.target.value)} /> */}
        </div>
        <div style={{ marginLeft: '50%', height: '100px' }}>
          <span class="details">Journey Date</span><br />
          <input required name="JourneyDate" type="date" disabled defaultValue={localStorage.getItem("JourneyDate")} /><br />
          <span class="details">Class</span>
          <input required type="text" defaultValue={localStorage.getItem("Class")} readOnly />
          <span class="details">Email</span><br />
          <input required type="email" name="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" onChange={(event) => setEmail(event.target.value)} />
        </div>

      </div>
      <span class="details">Payment</span><br />
      <select required name="Payment" id="Payment" onChange={(event) => setPayment(event.target.value)}>
        <option value="">Select Payment</option>
        <option value="Credit card">Credit card</option>
        <option value="Debit card">Debit card</option>
        <option value="Net Banking">Net Banking</option>
      </select>
      <br /><br />
      {buttonPress ? (<p style={{ color: 'red' }}><b>{showerror}</b></p>) : (<></>)}
      <input className="btn" type="submit" value="BookTicket" />
    </form>
    // </div>
  );
}

export default UserReservation;
