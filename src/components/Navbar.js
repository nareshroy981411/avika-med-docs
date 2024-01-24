import React from 'react';
import { Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HouseDoor, FileEarmarkText, Box } from 'react-bootstrap-icons';

const Navbar = () => {
  return (
    <Col xs={12} sm={2} md={2} lg={2} className="bg-info sidebar">
      <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link as={Link} to="/" className="d-flex align-items-center bg-warning">
          <Box size={20} className="mr-2" />
          Avika Med
        </Nav.Link>
        <Nav.Link as={Link} to="/dashboard" className="d-flex align-items-center">
          <HouseDoor size={20} className="mr-2" />
          Home Page
        </Nav.Link>
        <Nav.Link as={Link} to="/DocumentList" className="d-flex align-items-center">
          <FileEarmarkText size={20} className="mr-2" />
          Document List
        </Nav.Link>
      </Nav>
    </Col>
  );
};

export default Navbar;
