// DocumentDetailsPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HouseDoor, FileEarmarkText, Box } from 'react-bootstrap-icons';
import Image from "react-bootstrap/Image";
import Navbar from "./Navbar"

const PatientDetails = () => {
  const { id } = useParams();

  return (
    <Container fluid>
      <Row>
        <h1>Details for Patient ID: {id}</h1>
        {/* Side Navigation Bar */}
       <Navbar/>
      </Row>
    </Container>
  );
};

export default PatientDetails;
