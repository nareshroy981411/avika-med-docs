
import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import DocumentList from './components/DocumentList';
import DocumentDetails from './components/DocumentDetails';

const App = () => {
  return (
    <div>
      {/* <h1>App Routing page</h1> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/dashboard" element={<DashboardPage/>} />
          <Route path="/DocumentList" element={<DocumentList/>} />
          <Route path="/DocumentDetails/:id" element={<DocumentDetails/>} />
        </Routes>
      </BrowserRouter>
      </div>
  );
};

export default App;
