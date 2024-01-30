// DashboardPage.js

import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HouseDoor, FileEarmarkText } from "react-bootstrap-icons";
import Image from "react-bootstrap/Image";
import Navbar from "./Navbar"
import DocumentList from "./DocumentList";
import Headers from "./Header";

const DashboardPage = () => {
  return (
    <>
    <Headers/>
      <DocumentList />
    </>
  );
};

export default DashboardPage;
