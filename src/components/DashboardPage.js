// DashboardPage.js

import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HouseDoor, FileEarmarkText } from "react-bootstrap-icons";
import Image from "react-bootstrap/Image";
import Navbar from "./Navbar"

const DashboardPage = () => {
  return (
    <Container fluid className="p-0">
      <Row>
        {/* Side Navigation Bar */}
        <Navbar/>
      </Row>
    </Container>
  );
};

export default DashboardPage;
