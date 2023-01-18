import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import './Login.css';
import Register from "./images/register.jpg";
import './Adminicon.css'

export default function UserRegistration(props) {
    let navigate = useNavigate();
    const [FullName, setFullName] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('')
    const [UserName, setUserName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [CPassword, setCPassword] = useState('');


    const [buttonPress, setButtonPress] = useState(true);
    const [showerror, setShowerror] = useState('');

    const handleSubmit = (e) => {
        const out = {
            "FullName": FullName,
            "PhoneNumber": PhoneNumber,
            "UserName": UserName,
            "Email": Email,
            "Password": Password
        };
        if (Password !== CPassword) {
            setShowerror("Password not match");
        }
        else {
            axios.post('https://localhost:7040/api/UserRegistration/register', out)
                .then(function (response) {

                    console.log(response);
                    console.log(response.data);
                    console.log(response.status);
                    alert("Account successfully created");
                    setButtonPress(false);
                    props.setTrigger(false);
                })
                .catch(function (error) {
                    if (error.response.status === 400) {
                        console.log(error.response.data);
                        setShowerror(error.response.data);
                    }
                    else {
                        console.log("Server Down");
                        setShowerror("Server Down");
                    }
                });
        };

        e.preventDefault();
    }
    return (
        <div class="container">
            <div>
                <img className="reg" src={Register} alt="admin" />
            </div>
            <h2 style={{ color: 'black' }}>USER REGISTRATION</h2>
            <div class="content">
                <form className="Userform" onSubmit={(e) => { handleSubmit(e); }}>
                    <div className="user-details">
                        <div class="input-box2">
                            <span class="details">Full Name</span>
                            <input required type="text" placeholder="Full Name" onChange={event => setFullName(event.target.value)}></input>
                        </div>
                        <div class="input-box2">
                            <span class="details">Username</span>
                            <input required type="text" placeholder="Username" onChange={event => setUserName(event.target.value)}></input>
                        </div>
                        <div class="input-box2">
                            <span class="details">Email</span>
                            <input required type="email" name="email" placeholder="Email"
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" onChange={event => setEmail(event.target.value)}></input>
                        </div>
                        <div class="input-box2">
                            <span class="details">Phone Number</span>
                            <input required type="tel" name="PhoneNumber" placeholder="Phone Number" pattern="[0-9]{10}" onChange={event => setPhoneNumber(event.target.value)}></input>
                        </div>
                        <div class="input-box2">
                            <span class="details">Password</span>
                            <input required type="password" placeholder="Password" pattern=".{8,}" title="Eight or more characters" onChange={event => setPassword(event.target.value)}></input>
                        </div>
                        <div class="input-box2">
                            <span class="details">Confirm Password</span>
                            <input required type="password" placeholder="Confirm Password" pattern=".{8,}" title="Eight or more characters" onChange={event => setCPassword(event.target.value)}></input>
                        </div>
                    </div>
                    {buttonPress ? (<p style={{ color: 'red' }}><b>{showerror}</b></p>) : (<></>)}
                    <input className="btn" type="submit" value="Register" />
                </form>
            </div>
        </div>
    );
}