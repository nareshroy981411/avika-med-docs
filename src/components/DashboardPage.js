// DashboardPage.js

import React, { useState } from "react";
import { Container, Row, Col, Nav, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HouseDoor, FileEarmarkText, Box } from "react-bootstrap-icons";

const DashboardPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    // Handle file change event
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <Container fluid>
      <Row>
        {/* Side Navigation Bar */}
        <Col sm={2} className="bg-primary sidebar">
          <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link
              as={Link}
              to="/"
              className="d-flex align-items-center bg-warning"
            >
              <Box size={20} className="mr-2" />{" "}
              {/* Use the Box icon or replace it with your desired project name icon */}
              Avika Med
            </Nav.Link>
            {/* HomePage Link */}
            <Nav.Link as={Link} to="/" className="d-flex align-items-center">
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
        {/* Main Content */}
        <Col sm={6} className="ml-sm-auto main-content">
          {/* File Upload Section */}
          <h2>File Upload</h2>
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Choose a file:</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
          </Form>
        </Col>
        <Col sm={4} className="ml-sm-auto main-content">
          {/* Display selected file information */}
          {selectedFile && (
            <div>
              <h4>Selected File:</h4>
              <p>Name: {selectedFile.name}</p>
              <p>Type: {selectedFile.type}</p>
              <p>Size: {selectedFile.size} bytes</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;
