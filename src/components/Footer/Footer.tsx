import React from "react";
import "./footer.css"
import Logo from "../Logo/Logo";
import socialsImg from "../../assets/icons/Group 8.svg";
import downloadApp from "../../assets/icons/app-store.png"

const Footer: React.FC = () => {
  // Your component logic here
  return (
   <>
   <div className="footer">
   <div className="footerTextArea">

    {/*  */}
     <div className="right">
     <Logo />
     <p>Get the Travelcity Newsletter<br/>Email address (required)</p>
     <div className="buttongroup">
      <input type="text" className="inputIcon" placeholder="Enter your email address" />
      <button>Subscribe</button>
     </div>
     <h5>
     This site is protected by reCAPTCHA and the <br/> Google Privacy Policy and Terms of Service apply.
     </h5>
     <div className="socials">
      <h1>Follow us</h1>
      <img src={socialsImg} alt="social media" />
     </div>
     </div>

     {/*  */}
     <div className="left">
      <div className="footerInfo">
      <div className="footerText">
          <p>All Destinations</p>
          <span>All flight Destinations</span>
          <span>All car rental locations</span>
          <span>Flight finder</span>
          <span>Car rental</span>
          <span>Travelcity</span>
        </div>
        {/*  */}
        <div className="footerText">
          <p>Countries</p>
          <span>Regions</span>
          <span>Cities</span>
          <span>Airports</span>
          <span>Hotels</span>
        </div>
        {/*  */}
        <div className="footerText">
          <p>Homes</p>
          <span>Apartments</span>
          <span>Resort</span>
          <span>Villas</span>
          <span>Hostels</span>
        </div>
      </div>
      <div className="download">
        <img src={downloadApp} alt="" />
      </div>
     </div>
   </div>
   </div>
   </> 
  );
};

export default Footer;