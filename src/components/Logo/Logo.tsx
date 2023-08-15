import React from "react";
import logoImage from "../../assets/icons/logo.png";
import "./logo.css"

const Logo: React.FC = () => {
  // Your component logic here
  return (
    <div className="logoContainer">
      <img className="logoImage" src={logoImage} alt="brand logo" />
      <span className="logoText">
      Travelcity
      </span>
    </div>
  );
};

export default Logo;

export {}; // Add an empty export to make TypeScript treat this file as a module
