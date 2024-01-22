// DocumentDetailsPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HouseDoor, FileEarmarkText,Box } from 'react-bootstrap-icons';

const DocumentDetails = () => {
  const { id } = useParams(); // Access the patient ID from the route parameters

  // Fetch and display details based on the patient ID (Replace this with your actual logic)

  return (
    <Container fluid>
      <Row>
        
      <h1>Details for Patient ID: {id}</h1>
        {/* Side Navigation Bar */}
        <Col sm={2} className="bg-info sidebar">
          <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link as={Link} to="/" className="d-flex align-items-center bg-warning">
              <Box size={20} className="mr-2" /> {/* Use the Box icon or replace it with your desired project name icon */}
               Avika Med
            </Nav.Link>
            {/* HomePage Link */}
            <Nav.Link as={Link} to="/" className="d-flex align-items-center">
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

export default DocumentDetails;
