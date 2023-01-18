import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Admin from "./images/Admin.png";
import './Adminicon.css';
import '../Adminlogin/Login.css';


const Adminlogin = (props) => {
    let navigate = useNavigate();
    const [AdminName, setAdminName] = useState('');
    const [Password, setPassword] = useState('');
    const [buttonPress, setButtonPress] = useState(false);
    const [showerror, setShowerror] = useState('');

    const handleSubmit = (e) => {
        setButtonPress(true);
        const out = {
            "AdminName": AdminName,
            "Password": Password
        };
        axios.post(`${process.env.REACT_APP_URL}/api/Admin/login`, out)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem("Token", response.data);
                    localStorage.setItem('AdminLogin', true);
                    localStorage.setItem('UserName', AdminName);
                    props.setTrigger(false);
                }
            }).catch(function (error) {
                console.log(error.response.data);
                console.log(error.response.status);
                if (error.response.status === 400) {
                    console.log('Invalid Credentials');
                    setShowerror('Invalid Credentials');
                }
                else {
                    console.log("Server Down");
                    setShowerror('Server Down');
                }
            });
            e.preventDefault();
    }

    return (
        <form className="Userform" onSubmit={(e) => { handleSubmit(e); }}>
            <div><img src={Admin} alt="admin" style={{ height: '2cm', width: '2cm' }} /></div>
            <h2>ADMIN LOGIN</h2>
            <div >
                <label>Adminname</label>
            </div>
            <input required type="text" placeholder="AdminName" onChange={event => setAdminName(event.target.value)}></input>
            <div >
                <label>Password</label>
            </div>
            <input required type="password" placeholder="Password" onChange={event => setPassword(event.target.value)}></input>
            {buttonPress ? (<p style={{ color: 'red' }}><b>{showerror}</b></p>) : (<></>)}
            <input className="btn" type="submit" value="Login" />
            <br />
        </form>
    );
}
export default Adminlogin;