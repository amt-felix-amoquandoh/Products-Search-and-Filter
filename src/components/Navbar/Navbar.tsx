import Logo from "../Logo/Logo";
import { Menu, XCircle } from "react-feather";
import "./navbar.css";
import { menuList } from "./navList"; // Import menuList and MenuItem interface
import Dropdown from "../Dropdown/Dropdown";
import { Link } from "react-router-dom";
import DropButton from "../Buttons/DropButton";
import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="mediaNavbar">
      <div className="mediaNavbar-menu">
        {toggleMenu ? (
          <XCircle color="#464b93" onClick={() => setToggleMenu(false)} />
        ) : (
          <Menu color="#464b93" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <div className="mediaNavbar-menu_container scale-up-center">
            <div className="mediaNavbar-menu_container-links">
              <div className="listItemsBox">
                <Link className="navitem" to={menuList[1].url}>
                  {menuList[1].title}
                </Link>
                <Dropdown />
                <Link className="navitem" to={menuList[2].url}>
                  {menuList[2].title}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mediaNavbar-links">
        <div className="mediaNavbarLogo">
          <Logo />
        </div>
        <div className="mediaNavbar-links_container">
          <div className="listItemsBox">
            <Link className="navitem" to={menuList[1].url}>
              {menuList[1].title}
            </Link>
            <Dropdown />
            <Link className="navitem" to={menuList[2].url}>
              {menuList[2].title}
            </Link>
          </div>
        </div>
      </div>
      <div className="mediaNavbar-sign">
        <div className="registration">
          <span className="login">
            <Link to={menuList[3].url} className="login-link">Log in</Link>
          </span>
          <DropButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

export {}; // Add an empty export to make TypeScript treat this file as a module
