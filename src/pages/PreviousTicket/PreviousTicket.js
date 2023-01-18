import { React, useState, useEffect } from "react";
import axios from "axios";
import './PreviousTicket.css';
import Popup from '../../components/Popup/Popup';
import { useNavigate } from "react-router-dom";
import ViewTicket from "../ViewTicket/ViewTicket";

const PreviousTicket = () => {
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [Pnr, setPnr] = useState('');
    const [LogoutPopup, setLogoutPopup] = useState(false);
    const [CancelPopup, setCancelPopup] = useState(false);
    const [ViewTicketPopup, setViewTicketPopup] = useState(false);
    const axiosJWT = axios.create();
    useEffect(() => {
        setTimeout(() => {
            axiosJWT.get(`${process.env.REACT_APP_URL}/api/UserReservation/userticket/${localStorage.getItem('UserName')}`, {
                headers: {
                    authorization: "Bearer " + localStorage.getItem('Token')
                }
            })
                // .then((result) => setData(result.data))
                .then(function (result) {
                    console.log(result.data);
                    setData(result.data);
                });
        }, 1000);
    }, [data]);
    const can = (pnr) => {
        console.log(pnr);
        axiosJWT.delete(`${process.env.REACT_APP_URL}/api/UserReservation/cancelticket/` + pnr, {
            headers: {
                authorization: "Bearer " + localStorage.getItem('Token')
            }
        })
            .then(function (response) {
                console.log(response.data);
            }).catch(function (error) {
                console.log(error);
            });
    }
    const eTicket=(p)=>{
        axiosJWT.get(`${process.env.REACT_APP_URL}/api/UserReservation/GeteTicket/` + p, {
            headers: {
                authorization: "Bearer " + localStorage.getItem('Token')
            }
        })
            .then(function (response) {
                console.log(response.data);
            }).catch(function (error) {
                console.log(error);
            });
    }
    function logout() {
        localStorage.removeItem("TrainNumber");
        localStorage.removeItem("PNR");
        localStorage.removeItem("UserName");
        localStorage.removeItem("UserLogin");
        localStorage.removeItem("Token");
        navigate("/");
    }
    return (
        <>
            <div >

                <div>
                    <button className='btn' onClick={() => navigate('/BookTicket')}>Book Ticket</button>
                    <button className='btn' onClick={() => setLogoutPopup(true)}>Logout</button>
                    <Popup trigger={LogoutPopup} setTrigger={setLogoutPopup}>
                        <h3 style={{ color: 'black' }}>Are you sure?</h3>
                        <p style={{ color: 'black' }}>You want to logout?</p>
                        <button className="lbtn" onClick={() => logout()}>Logout</button>
                    </Popup>
                </div>
                <h1 style={{ color: "white" }}>View Ticket</h1>
                <div className="row" style={{ margin: "10px" }}>
                </div>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">PNR</th>
                            <th scope="col">TrainNumber</th>
                            <th scope="col">JourneyDate</th>
                            <th scope="col">NumberOfTickets</th>
                            <th scope="col">Payment</th>
                            <th scope="col">TravelClass</th>
                            <th scope="col">Email</th>
                            <th scope="col">View Ticket</th>
                            <th scope="col">Send eTicket</th>
                            <th scope="col">Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => {
                            return (
                                <tr key={item.trainNumber}>
                                    <td>{item.pnr}</td>
                                    <td>{item.trainNumber}</td>
                                    <td>{item.journeyDate}</td>
                                    <td>{item.numberOfTickets}</td>
                                    <td>{item.payment}</td>
                                    <td>{item.class.toUpperCase()}</td>
                                    <td>{item.email}</td>
                                    <td><button className='btn' onClick={() => { setPnr(item.pnr); setViewTicketPopup(true) }}>View Ticket</button>
                                        <Popup trigger={ViewTicketPopup} setTrigger={setViewTicketPopup}>
                                            <ViewTicket pnr={Pnr} />
                                        </Popup></td>
                                    <td><button className='btn' onClick={() => {eTicket(item.pnr)}}>eTicket</button></td>
                                    <td><button className='btn' onClick={() => { setPnr(item.pnr); setCancelPopup(true) }}>Cancel</button>
                                        <Popup trigger={CancelPopup} setTrigger={setCancelPopup}>
                                            <h3 style={{ color: 'black' }}>Are you sure?</h3>
                                            <p style={{ color: 'black' }}>You want to Cancel Ticket <b>PNR:{Pnr}</b>?</p>
                                            <button className="lbtn" onClick={() => { can(Pnr); setCancelPopup(false) }}>Cancel</button>
                                        </Popup></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default PreviousTicket