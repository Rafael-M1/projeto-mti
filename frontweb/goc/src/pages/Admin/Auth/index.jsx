// import { ReactComponent as LoginImage } from "./../../../assets/images/login-image.png";
import loginImage from "./../../../assets/images/login-image.png";
import loginImage2 from "./../../../assets/images/login-logo2.jpg";
import { Link } from "react-router-dom";
import Login from "./Login";

import "./styles.css";
import React from "react";

const Auth = ({ toggleAuth }) => {
  return (
    <div className="auth-container">
      <div className="auth-banner-container">
        <h1>Delegacia Virtual</h1>
        <img className="login-image" src={loginImage2}></img>
      </div>
      <div className="auth-form-container">
        <Login toggleAuth={toggleAuth} />
      </div>
    </div>
  );
};

export default Auth;
