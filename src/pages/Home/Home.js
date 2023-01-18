import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import './Home.css';
import Popup from '../../components/Popup/Popup';
import Admin from "./images/Admin.png";
import Adminlogin from "../Adminlogin/Adminlogin";
import Userlogin from "../Userlogin/Userlogin";
import UserRegistration from "../UserRegistration/UserRegistration";

const Navigation = () => {
  const [AdminLoginPopup, setAdminLoginPopup] = useState(false);
  const [UserRegistrationPopup, setUserRegistrationPopup] = useState(false);
  const [UserLoginPopup, setUserLoginPopup] = useState(false);
  const [LogoutPopup, setLogoutPopup] = useState(false);
  function logout() {
    localStorage.removeItem("TrainNumber");
    localStorage.removeItem("PNR");
    localStorage.removeItem("UserName");
    localStorage.removeItem("UserLogin");
    localStorage.removeItem("AdminLogin");
    localStorage.removeItem("AdminName");
    localStorage.removeItem("Token");
    navigate("/")
  }

  const navigate = useNavigate();
  if (localStorage.getItem('AdminLogin')) {
    return (
      <>
        <p>
          <button className="btn" onClick={() => navigate("/AdminOps")}>Admin Operation</button>
          <button className='btn' onClick={() => setLogoutPopup(true)}>Logout</button>
          <Popup trigger={LogoutPopup} setTrigger={setLogoutPopup}>
            <h3 style={{ color: 'black' }}>Are you sure?</h3>
            <p style={{ color: 'black' }}>You want to logout?</p>
            <button className="lbtn" onClick={() => {logout();setLogoutPopup(false)}}>Logout</button>
          </Popup>
        </p>
      </>
    )
  } if (localStorage.getItem('UserLogin')) {
    return (
      <>
        <p>
          <button className='btn' onClick={() => navigate('/BookTicket')}>Book Ticket</button>
          <button className='btn' onClick={() => navigate('/PreviousTicket')}>Previous Ticket</button>
          <button className='btn' onClick={() => setLogoutPopup(true)}>Logout</button>
          <Popup trigger={LogoutPopup} setTrigger={setLogoutPopup}>
            <h3 style={{ color: 'black' }}>Are you sure?</h3>
            <p style={{ color: 'black' }}>You want to logout?</p>
            <button className="lbtn" onClick={() => {logout();setLogoutPopup(false)}}>Logout</button>
          </Popup>
        </p>
      </>
    )
  } else {
    return (
      <>
        <p>
          <button className="btn" onClick={() => setAdminLoginPopup(true)}>Admin Login</button>
          <Popup trigger={AdminLoginPopup} setTrigger={setAdminLoginPopup}>
            <Adminlogin setTrigger={setAdminLoginPopup} />
          </Popup>
          <button className="btn" onClick={() => setUserRegistrationPopup(true)}>User Register</button>
          <Popup trigger={UserRegistrationPopup} setTrigger={setUserRegistrationPopup}>
            <UserRegistration setTrigger={setUserRegistrationPopup} />
          </Popup>
          <button className="btn" onClick={() => setUserLoginPopup(true)}>User Login</button>
          <Popup trigger={UserLoginPopup} setTrigger={setUserLoginPopup}>
            <Userlogin setTrigger={setUserLoginPopup}/>
          </Popup>
        </p>
      </>
    )
  }
}


const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      Axios.get("https://localhost:7040/api/TrainInfo").then((result) =>
        setData(result.data)
      );
    }, 1000);
  }, [data]);
  
  return (
    <div className="info">
      <div>
        <div className="container" />
        <div>
          <Navigation />
        </div>
        <div>
          <div className="row" style={{ margin: "10px" }}></div>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Train Number</th>
                <th scope="col">Origin</th>
                <th scope="col">Destination</th>
                <th scope="col">Departure Time</th>
                <th scope="col">Arrival Time</th>
                <th scope="col">Available Seats</th>
                <th scope="col">Per Ticket Cost</th>
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Home;