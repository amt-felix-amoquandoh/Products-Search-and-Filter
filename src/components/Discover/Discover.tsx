import React from "react";
import "./discover.css"
import MySwiper from "../Swiper/MySwiper";

const Discover: React.FC = () => {
  // Your component logic here
  return (
   <>
   <div className="discover">
   <div className="discoverTextArea">
          <h1>Where to go, right now</h1>
          <p>Spots at the top of travelers must go list</p>
   </div>
   <MySwiper />
   </div>
   </> 
  );
};

export default Discover;