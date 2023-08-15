import React from "react";
import "./swiper.css";

export interface DiscoverCardProps {
  imageUrl: string;
  cardHeading: string;
  cardText: string;
}

const TravelCards: React.FC<DiscoverCardProps> = (props) => {
  return (
    <div className="travelcard-container">
      <div className="travelCard">
      <div className="card-image">
        <img src={props.imageUrl} alt="Card Background" />
      </div>
      <div className="cardText">
        <p>{props.cardHeading}</p>
        <h5>{props.cardText}</h5>
      </div>
      </div>
    </div>
  );
};

export default TravelCards;
export {}; 