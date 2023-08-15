import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mainLogo from "../assets/icons/mainLogo.png";
import signupimage from "../assets/images/login-img.png";
import Button from "../components/Buttons/Buttons";
import "../assets/css/auth.scss";
import { postRequest } from "../api/request";


const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await postRequest("/check-email", {email});

    if(response){
      navigate(`/check-email?email=${email}`)
    }

  };

  return (
    <div className="wrapper">
      <div className="form">
        <div className="form__inner">
          <img className="form__logo" src={mainLogo} alt="logo" />
          <h2 className="form__title reset">Forgot Password?</h2>
          <p className="terms ">
            No worries, we will send you reset instructions
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form__input">
              <label htmlFor="email" className="label">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Type email address"
                value={email}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" block>
              Send link
            </Button>
          </form>
        </div>
      </div>
      <div className="image-wrapper">
        <img src={signupimage} alt="img" />
      </div>
    </div>
  );
};

export default ForgotPassword;
