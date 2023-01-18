import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Admin from "./images/Admin.png";
import './Usericon.css';
import './Login.css';

const Userlogin = (props) =>{
    let navigate = useNavigate();
    const [UserName, setUserName] = useState('');
    const [Password, setPassword] = useState('');
    const [buttonPress, setButtonPress] = useState(false);
    const [showerror, setShowerror] = useState('');

    const handleSubmit = (e) => {
        setButtonPress(true);
        const out = {
            "UserName": UserName,
            "Password": Password
        };
        axios.post("https://localhost:7040/api/UserRegistration/login", out)
        .then((response) => {
            if(response.status===200){
                localStorage.setItem("Token",response.data);
                localStorage.setItem('UserLogin',true);
                localStorage.setItem("UserName",UserName);
                setButtonPress(false);
                props.setTrigger(false);
            }})
            .catch(function (error) {
                if (error.response.status === 400) {
                    console.log('Invalid Credentials');
                    setShowerror(error.response.data);
                }
                else {
                    console.log("Server Down");
                    setShowerror("Server Down");
                }
            });
            e.preventDefault();
    }
    return(
                <form className="Userform" onSubmit={(e) => {handleSubmit(e);}}>
                    <div><img src={Admin} alt="admin" style={{ height: '2cm', width: '2cm' }}/></div>
                    <h2>USER LOGIN</h2>
                    <div >
                        <label>Username</label>
                    </div>
                    <input required type="text" placeholder="UserName" onChange={event => setUserName(event.target.value)}></input>
                    <div >
                        <label>Password</label>
                    </div>
                    <input required type="password" placeholder="Password" onChange={event => setPassword(event.target.value)}></input>
                    {buttonPress ? (<p style={{ color: 'red' }}><b>{showerror}</b></p>) : (<></>)}
                    <input className="btn" type="submit" value="Login" />
                </form>
    );
}
export default Userlogin;