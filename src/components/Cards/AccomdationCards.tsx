import React, { useState } from "react";
import "./card.css";
import { Heart } from "react-feather";
import product1 from "../../assets/images/accomodation/accomodation.png";

const AccomodationCards: React.FC = () => {
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const toggleHeartFill = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  return (
    <>
      <div className="cardContainer">
         <div className="accomodationCard">
            <div className="imageArea">
             <div>
               <img src={product1} alt="" />
               <Heart
                 className="heart-icon"
                 color={isHeartFilled ? "#B75C76" : "#B75C76"}
                 fill={isHeartFilled ? "#B75C76" : "none"}
                 size={34}
                 onClick={toggleHeartFill}
               />
             </div>
            </div>
            <div className="infoArea">
              <h3>Fitzroy London</h3>
              <div className="cardLinks">
                <a href={"/"}>New York</a>
                <a href={"/"}>Show on map</a>
              </div>
              <p>Lorem ipsum dolor sit amet consectetur. Fermentum in tortor mattis viverra iaculis nibh. Ac ultrices aliquet est facilisi fusce enim quis id felis.</p>
            </div>
            <div className="priceArea"></div>
         </div>
      </div>
   </>    
  );
};

export default AccomodationCards;
