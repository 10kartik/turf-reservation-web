// LoginForm.js
import React from "react";
import "./bg.css";
import Home from "./pages/home/index.js";

const LoginForm = () => {
  return (
    <div className="login-container">
      <div className="background-image" />
      <div className="translucent-rectangle">
        <div className="form-container">
          <Home />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
