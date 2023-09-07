// import { ReactComponent as LoginImage } from "./../../../assets/images/login-image.png";
import loginImage from "./../../../assets/images/login-image.png";
import { Link } from "react-router-dom";
import Login from "./Login";

import "./styles.css";
import React from "react";

const Auth = () => {
  return (
    <div className="auth-container">
      <div className="auth-banner-container">
        {/* <h1>Gestão de Ocorrências Criminais</h1> */}
        <h1>Gestão</h1>
        {/* <img className="login-image" src={loginImage}></img> */}
      </div>
      <div className="auth-form-container">
        <Login />
      </div>
    </div>
  );
};

export default Auth;
