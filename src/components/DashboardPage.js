// DashboardPage.js

import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HouseDoor, FileEarmarkText } from "react-bootstrap-icons";
import Image from "react-bootstrap/Image";

const DashboardPage = () => {
  return (
    <Container fluid className="p-0">
      <Row>
        {/* Side Navigation Bar */}
        <Col xs={12} sm={2} md={2} lg={2} className="bg-info sidebar">
          <Nav defaultActiveKey="/dashboard" className="flex-column">
            <Nav.Link as={Link} className="d-flex align-items-center bg-warning">
              <Image src="logo-black.png" roundedCircle />
              Avika Med
            </Nav.Link>
            {/* HomePage Link */}
            <Nav.Link as={Link} to="/dashboard" className="d-flex align-items-center">
              <HouseDoor size={20} className="mr-2" />
              Home Page
            </Nav.Link>
            {/* DocumentList Link */}
            <Nav.Link as={Link} to="/DocumentList" className="d-flex align-items-center">
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
