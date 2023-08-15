// Dropdown.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { menuList, MenuItem } from "./buttonItems";
import "./buttons.css"

const DropButton: React.FC = () => {
  // State to track whether the dropdown is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdownArea">
      {/* Clickable list item */}
      <button className="dropButton" onClick={toggleDropdown}>
        <span>Sign up</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
         <path d="M4.79998 7.19995L9.59998 -4.91142e-05H-2.47955e-05L4.79998 7.19995Z" fill="white"/>
        </svg>
    </button>

      {/* Dropdown content */}
      {isOpen && (
        <ul className={`navMenu ${isOpen ? 'active' : ''}`}>
          {menuList.map((item: MenuItem, index: number) => {
            const isActive = window.location.pathname === item.url;
            const itemClassName = `${item.cName} ${isActive ? 'activeItem' : ''}`;

            return (
              <li key={index} className={itemClassName}>
                <Link to={item.url}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DropButton;

