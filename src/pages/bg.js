// LoginForm.js
import React, { useState } from "react";
import "./bg.css";
import Home from "./home/index.js";
import AdminDashboard from "./admin/adminDashboard";

const LoginForm = () => {
  const [currentAdminEntity, setcurrentAdminEntity] = useState("");

  return (
    <div className="login-container">
      <div className="background-image" />
      <div className="translucent-rectangle">
        {currentAdminEntity ? (
          <div className="admin-container">
            <AdminDashboard currentAdmin={currentAdminEntity} />
          </div>
        ) : (
          <div className="form-container">
            <Home setcurrentAdminEntity={setcurrentAdminEntity} />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
