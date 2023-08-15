import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mainLogo from "../assets/icons/mainLogo.png";
import signupimage from "../assets/images/login-img.png";
import visibility from "../assets/icons/visibility-icon-13.jpg";
import visibilityOff from "../assets/icons/visibility_off.svg";
import facebook from "../assets/icons/facebook-icon.png";
import google from "../assets/icons/google-logo.png";
import Button from "../components/Buttons/Buttons";
import "../assets/css/auth.scss";
import { postRequest, setAuthToken } from "../api/request";
import { toast } from "react-toastify";

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here,
    const response = await postRequest("/customer-auth/login", formData);

    const { accessToken, refreshToken } = response;

    //TODO: setup store(redux or contextAPI) and save data
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setAuthToken(accessToken)
    toast("Login successful", {
      type: "success",
    });
    navigate("/welcome");
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div className="wrapper">
      <div className="form">
        <div className="form__inner">
          <img className="form__logo" src={mainLogo} alt="logo" />
          <h2 className="form__title">Log in</h2>
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
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form__input">
              <label htmlFor="password" className="label">
                Password
              </label>
              <div className="form__input__box">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Type password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form__input__box__password"
                  required
                />
                {showPassword ? (
                  <img
                    src={visibility}
                    alt="show password"
                    onClick={handleTogglePassword}
                    className="toggle-icon"
                  />
                ) : (
                  <img
                    src={visibilityOff}
                    alt="hide password"
                    onClick={handleTogglePassword}
                    className="toggle-icon"
                  />
                )}
              </div>
            </div>
            <p className="forgot-password"> <Link className="forgot-password" to="/forgot-password">  Forgot your password?</Link></p>
            <p className="terms">
              By signing up, you agree to campsite’s Terms of Service and
              Privacy policy
            </p>
            <Button type="submit" block>
              Log in
            </Button>
            <h6 className="or">OR</h6>
            <Button type="button" block outline>
              <img src={google} alt="google icon" />
              Google
            </Button>
            <Button type="button" block outline>
              <img src={facebook} alt="google icon" />
              Facebook
            </Button>
            <div className="login">
              Don't have an account? <Link to="/customer-signup">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
      <div className="image-wrapper">
        <img src={signupimage} alt="img" />
      </div>
    </div>
  );
};

export default Login;
