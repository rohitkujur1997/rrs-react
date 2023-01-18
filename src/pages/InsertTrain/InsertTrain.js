import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function InsertTrain(props) {
  let navigate = useNavigate();
  const [Origin, setOrigin] = useState('');
  const [Destination, setDestination] = useState('');
  const [DepartureDate, setDepartureDate] = useState('');
  // const [DepartureTime, setDepartureTime] = useState('');
  const [ArrivalDate, setArrivalDate] = useState('');
  // const [ArrivalTime, setArrivalTime] = useState('');
  const [NumberOfSeats, setNumberOfSeats] = useState('');
  const [TicketCost, setTicketCost] = useState('');

  const [AC1Seat, setAC1Seat] = useState('');
  const [AC1Cost, setAC1Cost] = useState('');
  const [AC2Seat, setAC2Seat] = useState('');
  const [AC2Cost, setAC2Cost] = useState('');
  const [AC3Seat, setAC3Seat] = useState('');
  const [AC3Cost, setAC3Cost] = useState('');
  const [SleeperSeat, setSleeperSeat] = useState('');
  const [SleeperCost, setSleeperCost] = useState('');
  const [buttonPress, setButtonPress] = useState(false);
  const [showerror, setShowerror] = useState('');
  const axiosJWT = axios.create();

  const handleSubmit = (e) => {
    setButtonPress(true);
    const out = {
      "Origin": Origin.toUpperCase(),
      "Destination": Destination.toUpperCase(),
      "DepartureDate": DepartureDate,
      // "DepartureTime": DepartureTime,
      "ArrivalDate": ArrivalDate,
      // "ArrivalTime": ArrivalTime,
      // "NumberOfSeats": NumberOfSeats,
      // "TicketCost": TicketCost,
      "AC1Seat": AC1Seat,
      "AC1Cost": AC1Cost,
      "AC2Seat": AC2Seat,
      "AC2Cost": AC2Cost,
      "AC3Seat": AC3Seat,
      "AC3Cost": AC3Cost,
      "SleeperSeat": SleeperSeat,
      "SleeperCost": SleeperCost
    };
    console.log(out);
    axiosJWT.post('https://localhost:7040/api/TrainInfo/InsertTrain', out, {
      headers: {
        authorization: "Bearer " + localStorage.getItem('Token')
      }
    })
      .then(function (response) {
        console.log(response.data);
        props.setTrigger(false);
      })

      .catch(function (error) {
        console.log(error);
        console.log(error.response.status);
        if (error.response.status === 401) {
          console.log('Unauthorized');
          setShowerror('Unauthorized');
        }
        else {
          console.log("Server Down");
          setShowerror('Server Down');
        }
      });
    e.preventDefault();
  }
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  return (
    <form className='Userform' onSubmit={(e) => { handleSubmit(e); }}>
      <h2 style={{ color: 'black' }}>ADD TRAIN</h2>
      <div style={{ width: "100%", overflow: "hidden" }}>
        <div style={{ width: '50%', height: '100%', float: 'left' }}>
          <span class="details">Origin</span>
          <input required type="text" onChange={event => setOrigin(event.target.value)}></input>
          <span class="details">Departure Date</span>
          <input required type="date" min={date.slice(6,) + "-" + date.slice(3, 5) + "-" + date.slice(0, 2)} onChange={event => setDepartureDate(event.target.value)}></input>
          <br />
          {/* <span class="details">Available Seats</span>
          <input required type="number" onChange={event => setNumberOfSeats(event.target.value)}></input> */}
          <span class="details">AC 1st Total Seat</span>
          <input required type="number" onChange={event => setAC1Seat(event.target.value)}></input>
          <span class="details">AC 2 Tier Total Seat</span>
          <input required type="number" onChange={event => setAC2Seat(event.target.value)}></input>
          <span class="details">AC 3 Tier Total Seat</span>
          <input required type="number" onChange={event => setAC3Seat(event.target.value)}></input>
          <span class="details">Sleeper Total Seat</span>
          <input required type="number" onChange={event => setSleeperSeat(event.target.value)}></input>
        </div>
        <div style={{ marginLeft: '50%', height: '100px' }}>
          <span class="details">Destination</span>
          <input required type="text" onChange={event => setDestination(event.target.value)}></input>
          <span class="details">Arrival Date</span>
          <input required type="date" min={(DepartureDate)} disabled={(DepartureDate.length) ? false : true} onChange={event => setArrivalDate(event.target.value)}></input>
          <br />
          {/* <span class="details">Ticket Cost</span>
          <input required type="number" onChange={event => setTicketCost(event.target.value)}></input> */}
          <span class="details">AC 1st Cost</span>
          <input required type="number" onChange={event => setAC1Cost(event.target.value)}></input>
          <span class="details">AC 2 Tier Cost</span>
          <input required type="number" onChange={event => setAC2Cost(event.target.value)}></input>
          <span class="details">AC 3 Tier Cost</span>
          <input required type="number" onChange={event => setAC3Cost(event.target.value)}></input>
          <span class="details">Sleeper Cost</span>
          <input required type="number" onChange={event => setSleeperCost(event.target.value)}></input>
        </div>
      </div>
      <br /><br />
      {buttonPress ? (<p style={{ color: 'red' }}><b>{showerror}</b></p>) : (<></>)}
      <input className="btn" type="submit" value="Add Train" />
    </form>
  );
}

export default InsertTrain;
