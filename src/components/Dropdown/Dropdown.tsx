// Dropdown.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { menuList, MenuItem } from "./DropdownItems";
import "./dropdown.css"

const Dropdown: React.FC = () => {
  // State to track whether the dropdown is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle mouse enter event
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  // Function to handle mouse leave event
  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className="dropdownArea" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* Clickable list item */}
      <div className="dropdownBtn">
        <span className="category">Categories</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9" fill="none">
          <path d="M0 2.20005L1.4 0.800049L6 5.40005L10.6 0.800049L12 2.20005L6 8.20005L0 2.20005Z" fill="#3d3939" />
        </svg>
      </div>

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


export default Dropdown;

