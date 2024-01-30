import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import DocumentList from "./components/DocumentList";
import PatientDetails from "./components/PatientDetails";
import Headers from "./components/Header";

export const baseUrl = process.env.REACT_APP_BASE_URL;
export const publicURL = process.env.REACT_APP_PUBLIC_URL;

console.groupCollapsed("base");
console.log("baseurl", baseUrl);
console.log("publicURL", publicURL);
console.groupEnd();
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
