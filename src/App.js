import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import PatientDetails from "./components/PatientDetails";

export const baseUrl = 'https://med.avika.ai';
export const publicURL = process.env.REACT_APP_BASE_URL;

const App = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const handleNavigation = () => {
      if (!token) {
        navigate('/');
      } else if (window.location.pathname === "/" && token) {
        navigate("/dashboard");
      }
    };
    handleNavigation();
    window.addEventListener("popstate", handleNavigation);
    return () => {
      window.removeEventListener("popstate", handleNavigation);
    };
  }, [token, navigate]);

  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardPage token={token} />} />
      <Route
        path="/PatientDetails/:id"
        element={<PatientDetails token={token} />}
      />
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
};

export default App;
