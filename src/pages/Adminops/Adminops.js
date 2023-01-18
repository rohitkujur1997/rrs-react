import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './Adminops.css'
import Popup from '../../components/Popup/Popup';
import InsertTrain from "../InsertTrain/InsertTrain";
import Updatetrain from "../UpdateTrain/UpdateTrain";

const Adminops = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [LogoutPopup, setLogoutPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [InsertPopup, setInsertPopup] = useState(false);
  const [UpdatePopup, setUpdatePopup] = useState(false);
  const [buttonPress, setButtonPress] = useState(false);
  const [showerror, setShowerror] = useState('');
  const axiosJWT = axios.create();

  useEffect(() => {
    setTimeout(() => {
      axios
        .get("https://localhost:7040/api/TrainInfo")
        .then((result) => setData(result.data));
      //console.log(data[0]);
    }, 1000);
  }, [data]);
  const setTrainNumber = (tn) => {
    localStorage.setItem("TrainNumber", tn)
  }

  const del = (dl) => {
    axiosJWT.delete("https://localhost:7040/api/TrainInfo/DeleteTrain/" + dl, {
      headers: {
        authorization: "Bearer " + localStorage.getItem('Token')
      }
    }).then(function (response) {
      console.log(response);
      setDeletePopup(false);
    }).catch(function (error) {
      console.log(error);
      setShowerror(error.response.data);
    })
    setDeletePopup(false);
  }
  function logout() {
    localStorage.removeItem("TrainNumber");
    localStorage.removeItem("AdminLogin");
    localStorage.removeItem("AdminName");
    localStorage.removeItem("Token");
    localStorage.removeItem("UserName");
    navigate("/");
  }
  function deletetrain(tn) {
    setTrainNumber(tn);
    setButtonPress(true);
    setDeletePopup(true);
  }
  return (
    <>
      <div className="logoutbtn">
        <button className="lbtn" onClick={() => setLogoutPopup(true)}>Logout</button>
      </div>
      <Popup trigger={LogoutPopup} setTrigger={setLogoutPopup}>
        <h3 style={{ color: 'black' }}>Are you sure?</h3>
        <p style={{ color: 'black' }}>You want to logout?</p>
        <button className="lbtn" onClick={() => { logout(); setLogoutPopup(false) }}>Logout</button>
      </Popup>
      <h1 className="head">ADMIN DASHBOARD</h1>
      <div className="insertbtn">
        <button className="btn" onClick={() => setInsertPopup(true)}>Insert Train</button>
      </div>
      <Popup trigger={InsertPopup} setTrigger={setInsertPopup}>
        <InsertTrain setTrigger={setInsertPopup} />
      </Popup>

      <div>
        <div>
          <div className="row" style={{ margin: "10px" }}>
          </div>



          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Train Number</th>
                <th scope="col">Origin</th>
                <th scope="col">Destination</th>
                <th scope="col">Departure Time</th>
                <th scope="col">Arrival Time</th>
                <th scope="col">Available Seats</th>
                <th scope="col">Ticket Cost</th>
                <th scope="col">Update Train</th>
                <th scope="col">Delete Train</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                return (
                  <tr key={item.trainNumber}>
                    <td><b>{item.trainNumber}</b></td>
                    <td>{item.origin}</td>
                    <td>{item.destination}</td>
                    <td>{item.departureDate.slice(0,10)}</td>
                    <td>{item.arrivalDate.slice(0,10)}</td>
                    <td>{item.numberOfSeats}</td>
                    <td>{item.ticketCost}</td>
                    <td><button className="btn" onClick={() => { setTrainNumber(item.trainNumber); setUpdatePopup(true) }}>Update Train</button></td>
                    <Popup trigger={UpdatePopup} setTrigger={setUpdatePopup}>
                      <Updatetrain setTrigger={setUpdatePopup} />
                    </Popup>
                    <td><button className="btn" onClick={() => deletetrain(item.trainNumber)}>Delete</button></td>
                    <Popup trigger={deletePopup} setTrigger={setDeletePopup}>
                      <h3>Are you sure?</h3>
                      <p>You want to Delete <b>Train Number: {localStorage.getItem('TrainNumber')}</b>?</p>
                      {buttonPress ? (<p style={{ color: 'red' }}><b>{showerror}</b></p>) : (<></>)}
                      <button className="lbtn" onClick={() => del(localStorage.getItem('TrainNumber'))}>Delete</button>
                    </Popup>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default Adminops;