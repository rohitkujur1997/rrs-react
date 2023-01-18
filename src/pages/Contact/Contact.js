import React from "react";
import me from "./me.jpeg";
import './Contact.css';
const Contact = () =>{
    return(
    <section class="team-section">
        <div class="row">
            <div class="team-items">
                <div class="item">
                    <img src={me} width="30%"  alt="team" />
                    <div class="inner">
                        <div class="info">
                            <h2>Rohit Kujur</h2>
                            <p>Analyst/Software Engineer</p>
                            <div class="social-links">
                                <a href="https://www.linkedin.com/in/rohit-kujur/" target="_blank"><span class="fa fa-linkedin fa-2x"></span></a>
                                <a href="https://github.com/rohitkujur1997/" target="_blank"><span class="fa fa-github fa-2x"></span></a>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </section>
    );
}
export default Contact;