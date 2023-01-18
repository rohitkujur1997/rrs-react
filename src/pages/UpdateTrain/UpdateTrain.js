// import './back.css';
import { React, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './UpdateTrain.css'
export default function Updatetrain(props) {
    // const [TrainNumber, setTrainNumber] = useState('');
    const [Origin, setOrigin] = useState('');
    const [Destination, setDestination] = useState('');
    const [DepartureDate, setDepartureDate] = useState('');
    const [ArrivalDate, setArrivalDate] = useState('');
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

    const navigate = new useNavigate();

    useEffect(() => {
        axios.get(`https://localhost:7040/api/TrainInfo/${localStorage.getItem('TrainNumber')}`)
            .then(function (response) {
                setOrigin(response.data.origin);
                setDestination(response.data.destination);
                setDepartureDate(response.data.departureDate.slice(0, 10));
                setArrivalDate(response.data.arrivalDate.slice(0, 10));
                setAC1Seat(response.data.aC1Seat);
                setAC1Cost(response.data.aC1Cost);
                setAC2Seat(response.data.aC2Seat);
                setAC2Cost(response.data.aC2Cost);
                setAC3Seat(response.data.aC3Seat);
                setAC3Cost(response.data.aC3Cost);
                setSleeperSeat(response.data.sleeperSeat);
                setSleeperCost(response.data.sleeperCost);
                console.log(response.data);
            });
    }, []);

    function handleSubmit(e) {
        setButtonPress(true);
        const Data = {
            "TrainNumber": localStorage.getItem('TrainNumber'),
            "Origin": Origin.toUpperCase(),
            "Destination": Destination.toUpperCase(),
            "DepartureDate": DepartureDate.slice(0, 10),
            "ArrivalDate": ArrivalDate.slice(0, 10),
            "AC1Seat": AC1Seat,
            "AC1Cost": AC1Cost,
            "AC2Seat": AC2Seat,
            "AC2Cost": AC2Cost,
            "AC3Seat": AC3Seat,
            "AC3Cost": AC3Cost,
            "SleeperSeat": SleeperSeat,
            "SleeperCost": SleeperCost
        };
        //console.log(Data);

        axiosJWT.put(`https://localhost:7040/api/TrainInfo/UpdateTrain`, Data, {
            headers: {
                authorization: "Bearer " + localStorage.getItem('Token')
            }
        })
            .then(function (response) {
                console.log(response.data);
                // alert("Updated Successfully..");
                props.setTrigger(false);
            }).catch(function (error) {
                console.log(error.response.data);
                console.log(error.response.status);
                if (error.response.status === 401) {
                    console.log('Unauthorized');
                    setShowerror('Unauthorized');
                }
                else if (error.response.status === 400) {
                    console.log(error.response.data);
                    setShowerror(error.response.data);
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
            <h1>UPDATE TRAIN</h1>
            <span>Train Number</span>
            <input required type="number" readOnly value={localStorage.getItem('TrainNumber')} ></input>
            <div style={{ width: "100%", overflow: "hidden" }}>
                <div style={{ width: '50%', height: '100%', float: 'left' }}>
                    <span>Origin</span>
                    <input required type="text" defaultValue={Origin} onChange={event => setOrigin(event.target.value)}></input>
                    <span>Departure Date</span>
                    <input required type="date" defaultValue={DepartureDate} min={date.slice(6,) + "-" + date.slice(3, 5) + "-" + date.slice(0, 2)} onChange={event => setDepartureDate(event.target.value)}></input>
                    <br />
                    <span class="details">AC 1st Total Seat</span>
                    <input required type="number" defaultValue={AC1Seat} onChange={event => setAC1Seat(event.target.value)}></input>
                    <span class="details">AC 2 Tier Total Seat</span>
                    <input required type="number" defaultValue={AC2Seat} onChange={event => setAC2Seat(event.target.value)}></input>
                    <span class="details">AC 3 Tier Total Seat</span>
                    <input required type="number" defaultValue={AC3Seat} onChange={event => setAC3Seat(event.target.value)}></input>
                    <span class="details">Sleeper Total Seat</span>
                    <input required type="number" defaultValue={SleeperSeat} onChange={event => setSleeperSeat(event.target.value)}></input>
                </div>
                <div style={{ marginLeft: '50%', height: '100px' }}>
                    <span>Destination</span>
                    <input required type="text" defaultValue={Destination} onChange={event => setDestination(event.target.value)}></input>
                    <span>Arrival Date</span>
                    <input required type="date" min={(DepartureDate)} disabled={(DepartureDate.length) ? false : true} defaultValue={ArrivalDate} onChange={event => setArrivalDate(event.target.value)}></input>
                    <br />
                    <span class="details">AC 1st Cost</span>
                    <input required type="number" defaultValue={AC1Cost} onChange={event => setAC1Cost(event.target.value)}></input>
                    <span class="details">AC 2 Tier Cost</span>
                    <input required type="number" defaultValue={AC2Cost} onChange={event => setAC2Cost(event.target.value)}></input>
                    <span class="details">AC 3 Tier Cost</span>
                    <input required type="number" defaultValue={AC3Cost} onChange={event => setAC3Cost(event.target.value)}></input>
                    <span class="details">Sleeper Cost</span>
                    <input required type="number" defaultValue={SleeperCost} onChange={event => setSleeperCost(event.target.value)}></input>
                </div>
            </div>
            {buttonPress ? (<p style={{ color: 'red' }}><b>{showerror}</b></p>) : (<></>)}
            <input className="btn" type="submit" value="Add Train" />
        </form>
    )
}
