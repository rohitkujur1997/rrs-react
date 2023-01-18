import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Popup from '../../components/Popup/Popup';
import UserReservation from '../UserReservation/UserReservation';
import './BookTicket.css';
function BookTicket() {

    const [Origin, setOrigin] = useState([]);
    const [Originvalue, setOriginvalue] = useState('');
    const [Destination, setDestination] = useState([]);
    const [Destinationvalue, setDestinationvalue] = useState('');
    const [Classvalue, setClassvalue] = useState('');
    const [Quotavalue, setQuotavalue] = useState('General');
    const [searchtrain, setSearchtrain] = useState(false);
    const [data, setData] = useState([]);
    const [Class, setClass] = useState('');
    const [Quota, setQuota] = useState('');
    const [Departure, setDeparture] = useState('');
    const navigate = new useNavigate();

    const [LogoutPopup, setLogoutPopup] = useState(false);
    const [BookTicketPopup, setBookTicketPopup] = useState(false);

    const axiosJWT = axios.create();
    useEffect(() => {
        axiosJWT.get("https://localhost:7040/api/TrainInfo/GetOrigin", {
            headers: {
                authorization: "Bearer " + localStorage.getItem('Token')
            }
        })
            .then(function (result) {
                setOrigin(result.data);
                console.log(result.data);
            })
    }, []);
    async function handleOrigin(e) {
        setDestination([]);
        setClass([]);
        const getOriginvalue = e.target.value;
        setOriginvalue(e.target.value);
        console.log(getOriginvalue);
        setOriginvalue(getOriginvalue);
        e.preventDefault();
        await axiosJWT.get(`https://localhost:7040/api/TrainInfo/GetDestination/${getOriginvalue}`, {
            headers: {
                authorization: "Bearer " + localStorage.getItem('Token')
            }
        })
            .then(function (response) {
                console.log(response.data);
                setDestination(response.data);
            });
    }
    async function handleDestination(e) {
        e.preventDefault();
        const getDestinationvalue = e.target.value;
        console.log(getDestinationvalue);
        setDestinationvalue(getDestinationvalue);

    }
    // async function handleClass(e) {
    //     e.preventDefault();
    //     const getClassvalue = e.target.value;
    //     console.log(getClassvalue);
    //     setClassvalue(getClassvalue);

    // }
    async function handleQuota(e) {
        e.preventDefault();
        const getQuotavalue = e.target.value;
        console.log(getQuotavalue);
        setQuotavalue(getQuotavalue);
        localStorage.setItem("Quota", e.target.value);

    }
    const setTrainInfo = (tn,q,cl,d) => {
        console.log(tn,q,cl,d);
        localStorage.setItem("TrainNumber", tn);
        localStorage.setItem("Quota", q);
        localStorage.setItem("Class", cl);
        localStorage.setItem("JourneyDate", d);
    }
    async function searchtrainfun() {
        setSearchtrain(true);
        console.log(Departure);
        await axiosJWT.get(`https://localhost:7040/api/TrainInfo/GetTrainOriginDestinationDeparture/${Originvalue}/${Destinationvalue}/${Departure}`, {
            headers: {
                authorization: "Bearer " + localStorage.getItem('Token')
            }
        })
            .then(function (response) {
                setData(response.data);
                console.log(response.data);
            });
    }
    function logout() {
        localStorage.removeItem("TrainNumber");
        localStorage.removeItem("PNR");
        localStorage.removeItem("UserName");
        localStorage.removeItem("Token");
        localStorage.removeItem("UserLogin");
        navigate("/");
    }
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    return (
        <><div><div className="fleft">
            <button className='btn' onClick={() => navigate('/PreviousTicket')}>Previous Ticket</button>
            <button className='btn' onClick={() => setLogoutPopup(true)}>Logout</button>
            <Popup trigger={LogoutPopup} setTrigger={setLogoutPopup}>
                <h3 style={{ color: 'black' }}>Are you sure?</h3>
                <p style={{ color: 'black' }}>You want to logout?</p>
                <button className="lbtn" onClick={() => logout()}>Logout</button>
            </Popup>
        </div>
            <div className="rrow">
                <select name="Origin" className='ccolumn' onChange={(e) => handleOrigin(e)}>
                    <option value="0">Select Origin</option>
                    {
                        Origin.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))
                    }
                </select>
                <i className="fa fa-arrow-right" />
                <select name="Destination" className='ccolumn' onChange={(e) => handleDestination(e)}>
                    <option selected>Select Destination</option>
                    {
                        Destination.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))
                    }
                </select>
                <br />
                {/* <select name="Class" className='ccolumn' onChange={(e) => handleClass(e)}>
                    <option selected value=''>Select Class</option>
                    <option value='AC1Seat'>AC First Class</option>
                    <option value='AC2Seat'>AC 2 Tier</option>
                    <option value='AC3Seat'>AC 3 Tier</option>
                    <option value='SleeperSeat'>Sleeper</option>
                </select> */}
                <input required className='ccolumn' type="date" min={date.slice(6,) + "-" + date.slice(3, 5) + "-" + date.slice(0, 2)} onChange={(e) => setDeparture(e.target.value)}></input>
                <br />
                <button className='submitButton' disabled={(Originvalue === '' && Destinationvalue === '' && Departure === '')} onClick={() => searchtrainfun()}>Search Train</button><br />
            </div>
            <div style={{textAlign:'right'}}>
                <select name="Quota" className='ccolumn' onChange={(e) => handleQuota(e)}>
                    {/* <option selected value=''>Select Quota</option> */}
                    <option selected value='General'>General</option>
                    <option value='Ladies'>Ladies</option>
                    <option value='SrCitizen'>Senior Citizen</option>
                </select>
            </div>
            {/* <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Train Number</th>
                        <th scope="col">Origin</th>
                        <th scope="col">Destination</th>
                        <th scope="col">Departure Time</th>
                        <th scope="col">Arrival Time</th>
                        <th scope="col">Available Seats</th>
                        <th scope="col">Ticket Cost</th>
                        <th scope="col">Book Ticket</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => {
                        return (
                            <tr key={item.trainNumber}>
                                <td>{item.trainNumber}</td>
                                <td>{item.origin}</td>
                                <td>{item.destination}</td>
                                <td>{item.departureDate.slice(0,10)}</td>
                                <td>{item.arrivalDate.slice(0,10)}</td>
                                <td>{item.numberOfSeats}</td>
                                <td>{item.ticketCost}</td>
                                <td>
                                    <button className='btn' onClick={() => { setTrainNumber(item.trainNumber); setBookTicketPopup(true) }}>Book Ticket</button>
                                    <Popup trigger={BookTicketPopup} setTrigger={setBookTicketPopup}>
                                        <UserReservation setTrigger={setBookTicketPopup} />
                                    </Popup>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table> */}
            {data.map((item) => {
                return (
                    <div className="containerdetail">
                        <div style={{ display: 'flex' }}>
                            <div className='title'>Train Number: {item.trainNumber}</div>
                            <div className='boxes' style={{ textAlign: 'right' }}>
                                <span className='details'>Quota: {Quotavalue}</span>
                            </div>
                        </div>
                        <div className='train-details'>
                            <div className='boxes'>
                                <span className='details'><b>{item.origin}</b> | {item.departureDate.slice(0, 10)}</span>
                            </div>
                            <div className='boxes' style={{ textAlign: 'right' }}>
                                <span className='details'><b>{item.destination}</b> | {item.arrivalDate.slice(0, 10)}</span>
                            </div>
                            {/* <div className='boxes'>
                                <span className='details'>Class: {Classvalue}</span>
                            </div>
                            <div className='boxes'>
                                <span className='details'>Quota: {Quotavalue}</span>
                            </div>
                            <div className='boxes'>
                                <span className='details'>Available seats: {item.numberOfSeats}</span>
                            </div>
                            <div className='boxes'>
                                <span className='details'>Ticket Fare: {item.ticketCost} I.N.R</span>
                            </div> */}
                        </div>
                        <div className='button'>
                            <div class="float-parent-element">

                                <div class="float-child-element">
                                    <div>
                                        <span className='details'><b>AC 1</b></span><br />
                                        {(() => {
                                            if (localStorage.getItem("Quota") === 'Ladies') {
                                                return (<>
                                                    <span className='details'>Available seats: {item.aC1SeatLadies}</span><br /></>
                                                )
                                            } else if (localStorage.getItem("Quota") === 'SrCitizen') {
                                                return (<>
                                                    <span className='details'>Available seats: {item.aC1SeatSrCitizen}</span><br /></>
                                                )
                                            } else if (localStorage.getItem("Quota") === 'General') {
                                                return (<>
                                                    <span className='details'>Available seats: {item.aC1SeatGeneral}</span><br /></>
                                                )
                                            }
                                        })()}
                                        <span className='details'>Ticket Fare: ₹{item.aC1Cost}</span>
                                    </div>
                                    <button className='btn' onClick={() => { setTrainInfo(item.trainNumber,Quotavalue,'aC1',item.departureDate.slice(0, 10)); setBookTicketPopup(true) }}>Book Ticket</button>
                                </div>
                                <div class="float-child-element">
                                    <div>
                                        <span className='details'><b>AC 2</b></span><br />
                                        {(() => {
                                            if (localStorage.getItem("Quota") === 'Ladies') {
                                                return (<>
                                                    <span className='details'>Available seats: {item.aC2SeatLadies}</span><br /></>
                                                )
                                            } else if (localStorage.getItem("Quota") === 'SrCitizen') {
                                                return (<>
                                                    <span className='details'>Available seats: {item.aC2SeatSrCitizen}</span><br /></>
                                                )
                                            } else if (localStorage.getItem("Quota") === 'General') {
                                                return (<>
                                                    <span className='details'>Available seats: {item.aC2SeatGeneral}</span><br /></>
                                                )
                                            }
                                        })()}
                                        <span className='details'>Ticket Fare: ₹{item.aC2Cost}</span>
                                    </div>
                                    <button className='btn' onClick={() => { setTrainInfo(item.trainNumber,Quotavalue,'aC2',item.departureDate.slice(0, 10)); setBookTicketPopup(true) }}>Book Ticket</button>
                                </div>
                                <div class="float-child-element">
                                    <div>
                                        <span className='details'><b>AC 3</b></span><br />
                                        {(() => {
                                            if (localStorage.getItem("Quota") === 'Ladies') {
                                                return (<>
                                                    <span className='details'>Available seats: {item.aC3SeatLadies}</span><br /></>
                                                )
                                            } else if (localStorage.getItem("Quota") === 'SrCitizen') {
                                                return (<>
                                                    <span className='details'>Available seats: {item.aC3SeatSrCitizen}</span><br /></>
                                                )
                                            } else if (localStorage.getItem("Quota") === 'General') {
                                                return (<>
                                                    <span className='details'>Available seats: {item.aC3SeatGeneral}</span><br /></>
                                                )
                                            }
                                        })()}
                                        <span className='details'>Ticket Fare: ₹{item.aC3Cost}</span>
                                    </div>
                                    <button className='btn' onClick={() => { setTrainInfo(item.trainNumber,Quotavalue,'aC3',item.departureDate.slice(0, 10)); setBookTicketPopup(true) }}>Book Ticket</button>
                                </div>
                                <div class="float-child-element">
                                    <div>
                                        <span className='details'><b>Sleeper</b></span><br />
                                        {(() => {
                                            if (localStorage.getItem("Quota") === 'Ladies') {
                                                return (<>
                                                    <span className='details'>Available seats: {item.sleeperSeatLadies}</span><br /></>
                                                )
                                            } else if (localStorage.getItem("Quota") === 'SrCitizen') {
                                                return (<>
                                                    <span className='details'>Available seats: {item.sleeperSeatSrCitizen}</span><br /></>
                                                )
                                            } else if (localStorage.getItem("Quota") === 'General') {
                                                return (<>
                                                    <span className='details'>Available seats: {item.sleeperSeatGeneral}</span><br /></>
                                                )
                                            }
                                        })()}
                                        <span className='details'>Ticket Fare: ₹{item.sleeperCost}</span>
                                    </div>
                                    <button className='btn' onClick={() => { setTrainInfo(item.trainNumber,Quotavalue,'sleeper',item.departureDate.slice(0, 10)); setBookTicketPopup(true) }}>Book Ticket</button>
                                </div>
                            </div>
                            <Popup trigger={BookTicketPopup} setTrigger={setBookTicketPopup}>
                                <UserReservation setTrigger={setBookTicketPopup} />
                            </Popup>
                        </div>
                    </div>

                );
            })}
        </div></>
    )
}
export default BookTicket

// import axios from 'axios';
// import { useNavigate, Link } from "react-router-dom";
// import React, { useState, useEffect } from 'react';
// import Popup from '../../components/Popup/Popup';
// import UserReservation from '../UserReservation/UserReservation';
// function BookTicket() {

//     const [Origin, setOrigin] = useState([]);
//     const [Originvalue, setOriginvalue] = useState('');
//     const [Destination, setDestination] = useState([]);
//     const [Destinationvalue, setDestinationvalue] = useState('');
//     const [searchtrain, setSearchtrain] = useState(false);
//     const [data, setData] = useState([]);
//     const navigate = new useNavigate();

//     const [LogoutPopup, setLogoutPopup] = useState(false);
//     const [BookTicketPopup, setBookTicketPopup] = useState(false);

//     const axiosJWT = axios.create();
//     useEffect(() => {
//         axiosJWT.get("https://localhost:7040/api/TrainInfo/GetOrigin", {
//             headers: {
//                 authorization: "Bearer " + localStorage.getItem('Token')
//             }
//         })
//             .then(function (result) {
//                 setOrigin(result.data);
//                 console.log(result.data);
//             })
//     }, []);
//     async function handleOrigin(e) {
//         setDestination([]);
//         const getOriginvalue = e.target.value;
//         setOriginvalue(e.target.value);
//         console.log(getOriginvalue);
//         setOriginvalue(getOriginvalue);
//         e.preventDefault();
//         await axiosJWT.get(`https://localhost:7040/api/TrainInfo/GetDestination/${getOriginvalue}`, {
//             headers: {
//                 authorization: "Bearer " + localStorage.getItem('Token')
//             }
//         })
//             .then(function (response) {
//                 console.log(response.data);
//                 setDestination(response.data);
//             });
//     }
//     async function handleDestination(e) {
//         e.preventDefault();
//         const getDestinationvalue = e.target.value;
//         console.log(getDestinationvalue);
//         setDestinationvalue(getDestinationvalue);

//     }
//     const setTrainNumber = (tn) => {
//         console.log(tn);
//         localStorage.setItem("TrainNumber", tn);
//     }
//     async function searchtrainfun() {
//         setSearchtrain(true);
//         await axiosJWT.get(`https://localhost:7040/api/TrainInfo/GetTrainOriginDestination/${Originvalue}/${Destinationvalue}`, {
//             headers: {
//                 authorization: "Bearer " + localStorage.getItem('Token')
//             }
//         })
//             .then(function (response) {
//                 setData(response.data);
//                 console.log(response.data);
//             });
//     }
//     function logout() {
//         localStorage.removeItem("TrainNumber");
//         localStorage.removeItem("PNR");
//         localStorage.removeItem("UserName");
//         localStorage.removeItem("Token");
//         localStorage.removeItem("UserLogin");
//         navigate("/");
//     }
//     return (
//         <><div><div className="fleft">
//             <button className='btn' onClick={() => navigate('/PreviousTicket')}>Previous Ticket</button>
//             <button className='btn' onClick={() => setLogoutPopup(true)}>Logout</button>
//             <Popup trigger={LogoutPopup} setTrigger={setLogoutPopup}>
//                 <h3 style={{ color: 'black' }}>Are you sure?</h3>
//                 <p style={{ color: 'black' }}>You want to logout?</p>
//                 <button className="lbtn" onClick={() => logout()}>Logout</button>
//             </Popup>
//         </div>
//             <div className="rrow">
//                 <select name="Origin" className='ccolumn' onChange={(e) => handleOrigin(e)}>
//                     <option value="0">Select Origin</option>
//                     {
//                         Origin.map((item) => (
//                             <option key={item} value={item}>{item}</option>
//                         ))
//                     }
//                 </select>
//                 <select name="Destination" className='ccolumn' onChange={(e) => handleDestination(e)}>
//                     <option selected>Select Destination</option>
//                     {
//                         Destination.map((item) => (
//                             <option key={item} value={item}>{item}</option>
//                         ))
//                     }
//                 </select>
//                 <button className='submitButton' disabled={(Originvalue == '' && Destinationvalue == '')} onClick={() => searchtrainfun()}>Search Train</button><br />
//             </div>
//             <br />
//             <table className="table">
//                 <thead className="thead-dark">
//                     <tr>
//                         <th scope="col">Train Number</th>
//                         <th scope="col">Origin</th>
//                         <th scope="col">Destination</th>
//                         <th scope="col">Departure Time</th>
//                         <th scope="col">Arrival Time</th>
//                         <th scope="col">Available Seats</th>
//                         <th scope="col">Ticket Cost</th>
//                         <th scope="col">Book Ticket</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((item) => {
//                         return (
//                             <tr key={item.trainNumber}>
//                                 <td>{item.trainNumber}</td>
//                                 <td>{item.origin}</td>
//                                 <td>{item.destination}</td>
//                                 <td>{item.departureDate}</td>
//                                 <td>{item.arrivalDate}</td>
//                                 <td>{item.numberOfSeats}</td>
//                                 <td>{item.ticketCost}</td>
//                                 <td>
//                                     <button className='btn' onClick={() => { setTrainNumber(item.trainNumber); setBookTicketPopup(true) }}>Book Ticket</button>
//                                     <Popup trigger={BookTicketPopup} setTrigger={setBookTicketPopup}>
//                                         <UserReservation setTrigger={setBookTicketPopup}/>
//                                     </Popup>
//                                 </td>
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>

//         </div></>
//     )
// }
// export default BookTicket