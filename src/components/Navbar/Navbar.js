import React, {useEffect} from "react";
import './Navbar.css';
import { NavLink } from "react-router-dom";
import $ from 'jquery';
import logo from '../Images/logo.JPG'

const Navbar = () =>{
    return(
    <div className="navbar">

        <NavLink className="navlink" to="/" exact>
            <i className="fa fa-train"></i>
            Railways Reservation System
        </NavLink>
        <NavLink className="navlink" to="/contact" exact>
            <i className="fa fa-users"></i>
            Our Team
        </NavLink>
    </div>
    );
}
export default Navbar;