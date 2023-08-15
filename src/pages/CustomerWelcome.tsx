import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Buttons/Buttons";

import "../assets/css/auth.scss";

const Welcome = () => {
  return (
    <>
    <div className="form">
      <h2>Welcome Customer</h2>
      <div className="login">
        <Button type="button" >
          <Link to="/">Log out</Link>
        </Button>
      </div>
      </div>
    </>
  );
};

export default Welcome;
