import React from 'react'
import playstore from "../../../images/playstore.png";
import Appstore from "../../../images/Appstore.png";
import "./Footer.css";
const Footer = () => {
    return (
        <footer if="footer">
            <div className="leftFooter">
        <h4>dounload our app</h4>
        <p>download app for android and ios mobile phone</p>
        <img src={playstore} alt="playStore"/>
        <img src={Appstore} alt="appStore" />
            </div>

            <div className="midFooter">
            <h1>Ecomerce.</h1>
            <p>high quality is our first priority</p>
            <p>copyright 2021 &copy; SahilNamdeo</p>
            </div>


            <div className="rightFooter">
            <h4>Follow Us</h4>
        <a href="http://instagram.com/sahillnamdeo">Instagram</a>
        <a href="http://youtube.com/sahilnamdeo">Youtube</a>
        <a href="http://instagram.com/sahillnamdeo">Facebook</a>
            </div>
        </footer>
    );
};

export default Footer;
