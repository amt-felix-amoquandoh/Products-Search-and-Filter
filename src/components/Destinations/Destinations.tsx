import React from "react";
import "./destinations.css"

const Destinations: React.FC = () => {
  // Your component logic here
  return (
   <>
   <div className="destinations">
    <div className="destinationsContent">
    <h1>Destinations we love</h1>
       <div className="destinationInfo">
        {/*  */}
        <div className="destination">
          <p>Regions</p>
          <span>Texas</span>
          <span>England</span>
          <span>Cornwall</span>
          <span>Germany</span>
        </div>
        {/*  */}
        <div className="destination">
          <p>Cities</p>
          <span>Hawaii</span>
          <span>Lake District</span>
          <span>Ibiza</span>
          <span>Jersey</span>
        </div>
        {/*  */}
        <div className="destination">
          <p>Places of Interest</p>
          <span>Bora Bora</span>
          <span>Uttar Pradesh</span>
          <span>Bali</span>
          <span>Tenerife</span>
        </div>
        {/*  */}
        <div className="destination">
          <p>Ras AI</p>
          <span>Isle of Wright</span>
          <span>Santorini</span>
          <span>Zanzibar</span>
          <span>Guernsey</span>
        </div>
        {/*  */}
        <div className="destination">
        <span>Bora Bora</span>
          <span>Uttar Pradesh</span>
          <span>Bali</span>
          <span>Tenerife</span>
        </div>
       </div>
    </div>
   </div>
   </> 
  );
};

export default Destinations;