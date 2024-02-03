import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import PatientDetails from "./components/PatientDetails";

export const baseUrl = 'https://med.avika.ai';
export const publicURL = process.env.REACT_APP_BASE_URL;

const token = sessionStorage.getItem("token");

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage token={token} />} />
        <Route
          path="/PatientDetails/:id"
          element={<PatientDetails token={token} />}
        />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
