import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Table, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HouseDoor, FileEarmarkText } from 'react-bootstrap-icons';
import Image from 'react-bootstrap/Image';

const DocumentList = () => {
  const [searchName, setSearchName] = useState('');
  const [searchAge, setSearchAge] = useState('');
  const [searchGender, setSearchGender] = useState('');
  const [patientData, setPatientData] = useState([]);
  const [apiEndpoint, setApiEndpoint] = useState('https://med.test.avika.ai/admin/searchMedicalRecord');

  useEffect(() => {
    // Fetch patient data from API based on search criteria
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiEndpoint}/admin/searchMedicalRecord?searchName=${searchName}&searchAge=${searchAge}&searchGender=${searchGender}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPatientData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, [apiEndpoint, searchName, searchAge, searchGender]);

  const handleSearch = () => {
    // Triggering the API call is now handled by useEffect
    // You can perform additional actions here if needed
  };

  useEffect(() => {
    // Load API endpoint from environment variables
    // You can skip this part if you set the API endpoint directly
    // Replace REACT_APP_API_ENDPOINT with the actual variable name if different
    setApiEndpoint(process.env.REACT_APP_API_ENDPOINT || 'https://med.test.avika.ai/admin/searchMedicalRecord');
  }, []);

  return (
    <Container fluid>
      <Row>
        {/* Side Navigation Bar */}
        <Col sm={2} className="bg-info sidebar">
          <Nav defaultActiveKey="/dashboard" className="flex-column">
            <Nav.Link as={Link} className="d-flex align-items-center bg-warning">
              <Image src="logo-black.png" roundedCircle alt="Avika Med" />
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

        {/* Search Bar */}
        <Col sm={9} className="ml-sm-auto main-content">
          <Form>
            <Form.Group controlId="searchName">
              <Form.Label>Patient Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter patient name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="searchAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter patient age"
                value={searchAge}
                onChange={(e) => setSearchAge(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="searchGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter patient gender"
                value={searchGender}
                onChange={(e) => setSearchGender(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="button" onClick={handleSearch}>
              Search
            </Button>
          </Form>
        </Col>

        {/* Patient Data Table */}
        <Col sm={9} className="ml-sm-auto main-content">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Date of Registration</th>
                <th>IP Number</th>
                <th>OP Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patientData.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.patient_name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.Date_of_registration}</td>
                  <td>{patient.ip_number}</td>
                  <td>{patient.op_number}</td>
                  <td>
                    <Link to={`/details/${patient.id}`}>
                      <Button variant="info">Details</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default DocumentList;
