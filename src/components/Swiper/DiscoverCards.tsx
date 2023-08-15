import React from "react";
import "./swiper.css";

export interface DiscoverCardProps {
  imageUrl: string;
  cardText: string;
}

const DiscoverCards: React.FC<DiscoverCardProps> = (props) => {
  return (
    <div className="card-container">
      <div className="card-image">
        <img src={props.imageUrl} alt="Card Background" />
      </div>
      <div className="card-content">
        <h5>{props.cardText}</h5>
      </div>
    </div>
  );
};

export default DiscoverCards;
