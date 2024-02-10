import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import PageNotFound from "./components/pageNotFound/pageNotFound";
import Login from "./components/login/LoginPage";
import DashboardPage from "./components/dashboard/DashboardPage";
import PatientDetails from "./containers/PatientDetails";
import Home from "./components/header/Header";

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
    <>
      <Home />  {/* Header */}
      <Routes>
        {/* <Route path="/home" element={<DashboardPage token={token} />} /> */}
        <Route
          path="/PatientDetails/:id"
          element={<PatientDetails token={token} />}
        />
        <Route path="/" element={<Login />} />
        <Route
          path="*"
          element={
            <PageNotFound />
          }
        />
      </Routes>
    </>
  );
};

export default App;
