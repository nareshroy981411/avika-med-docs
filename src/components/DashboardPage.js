// DashboardPage.js

import React, { useState } from "react";
import { Container, Row, Col, Nav, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HouseDoor, FileEarmarkText, Box } from "react-bootstrap-icons";
import Image from "react-bootstrap/Image";

const DashboardPage = () => {


  return (
    <Container fluid>
      <Row>
        {/* Side Navigation Bar */}
        <Col sm={2} className="bg-primary sidebar">
          <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link
              as={Link}
              className="d-flex align-items-center bg-warning"
            >
              <Image src="logo-black.png" roundedCircle />
              Avika Med
            </Nav.Link>
            {/* HomePage Link */}
            <Nav.Link
              as={Link}
              to="/dashboard"
              className="d-flex align-items-center"
            >
              <HouseDoor size={20} className="mr-2" />
              Home Page
            </Nav.Link>

            {/* DocumentList Link */}
            <Nav.Link
              as={Link}
              to="/DocumentList"
              className="d-flex align-items-center"
            >
              <FileEarmarkText size={20} className="mr-2" />
              Document List
            </Nav.Link>
          </Nav>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;
