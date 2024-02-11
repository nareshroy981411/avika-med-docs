import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import PageNotFound from "./components/notfoundpage/notFoundPage";
import Login from "./components/LoginPage";
import Home from "./components/header/Header";
import PatientDetails from "./containers/PatientDetails";
import DashboardPage from "./components/dashboard/DashboardPage";
import About from "./components/about/about";

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
        navigate("/home");
      }
    };
    handleNavigation();
    window.addEventListener("popstate", handleNavigation);
    return () => {
      window.removeEventListener("popstate", handleNavigation);
    };
  }, [token, navigate]);

  if (!token) {
    return <Login />
  } else {
    return (
      <>
        <Home>
          <Routes>
            <Route path="/home" element={<DashboardPage token={token} />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/PatientDetails/:id"
              element={<PatientDetails token={token} />}
            />
            <Route
              path="*"
              element={
                <PageNotFound />
              }
            />
          </Routes>
        </Home>
      </>
    )
  }
};

export default App;
