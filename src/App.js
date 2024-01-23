
import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import DocumentList from './components/DocumentList';
import PatientDetails from './components/PatientDetails';

export const baseUrl = process.env.REACT_APP_BASE_URL;
export const publicURL = process.env.REACT_APP_PUBLIC_URL;

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/dashboard" element={<DashboardPage/>} />
          <Route path="/DocumentList" element={<DocumentList/>} />
          <Route path="/PatientDetails/:id" element={<PatientDetails/>} />
        </Routes>
      </BrowserRouter>
      </div>
  );
};

export default App;

