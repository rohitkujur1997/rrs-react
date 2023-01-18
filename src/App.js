import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import backgroundvideo from "./videos/background.mp4";
import './App.css';
import Adminops from "./pages/Adminops/Adminops";
import UserRegistration from "./pages/UserRegistration/UserRegistration";
import BookTicket from "./pages/BookTicket/BookTicket";
import UserReservation from "./pages/UserReservation/UserReservation";
import UserReservationTicket from "./pages/UserReservationTicket/UserReservationTicket";
import PreviousTicket from "./pages/PreviousTicket/PreviousTicket";
import ViewTicket from "./pages/ViewTicket/ViewTicket";

const App = () => {
  return (
    <Router>

      <div className="main">
        <video src={backgroundvideo} autoPlay loop muted />
      </div>
      <div className='overlay'></div>

      <div className='middlecontent'>
        <Navbar />
        <div className="screen">
          <section class="team-section">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Adminops" element={<Adminops />} />
              <Route path="/BookTicket" element={<BookTicket />} />
              <Route path="/UserReservation" element={<UserReservation />} />
              <Route path="/UserReservationTicket" element={<UserReservationTicket />} />
              <Route path="/PreviousTicket" element={<PreviousTicket />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </section>
        </div>
      </div>
    </Router>
  );
}

export default App;
