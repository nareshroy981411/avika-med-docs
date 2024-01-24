import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Table, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HouseDoor, FileEarmarkText, Box } from 'react-bootstrap-icons';
import axios from "axios";
import { TablePagination } from '@mui/material';
import Navbar from "./Navbar"
import { baseUrl } from '../App';

const DocumentList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patientData, setPatientData] = useState([]);
  const [filteredPatientData, setFilteredPatientData] = useState([]);
  const [searchResultMessage, setSearchResultMessage] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const token = sessionStorage.getItem("token");

  const handlePageChange = (e, p) => {
    e.preventDefault();
    setPage(p)
  }

  const handleRowPerPageChange = (e) => {
    setRowsPerPage(e.target.value)
    setPage(0)
  }

  const getAllRecords = async () => {
    try {
      const response = await axios.get(`${baseUrl}/admin/records`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPatientData(response?.data?.data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault()
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredData = patientData.filter((patient) => {
      return (
        patient.patient_name.toLowerCase().includes(lowerCaseSearchTerm) ||
        patient.age.toString().includes(searchTerm) ||
        patient.gender.toLowerCase().includes(lowerCaseSearchTerm)
      );
    });

    if (filteredData.length === 0) {
      setSearchResultMessage('No matching records found');
    } else {
      setSearchResultMessage('');
    }
    setFilteredPatientData(filteredData);
  };

  useEffect(() => {
    getAllRecords();
  }, [token]);

  useEffect(() => {
    setFilteredPatientData(patientData);
  }, [patientData]);


  return (
    <>
      {/* Side Navigation Bar */}
      {/* <Navbar/> */}

      {/* Search Bar */}
      <Form onSubmit={handleSearch} className="d-flex m-2">
        <Form.Group controlId="searchTerm" className="w-50">
          <Form.Control
            className="w-75 "
            type="text"
            placeholder="Search by patient name, age, gender, etc."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="button" onClick={handleSearch}>
          Search
        </Button>
      </Form>

      {/* Patient Data Table */}

      <Table striped bordered hover className='m-1'>
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
          {filteredPatientData.length === 0 ? (
            <tr>
              <td colSpan="7">No matching records found</td>
            </tr>
          ) : (
            filteredPatientData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((patient) => (
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
            ))
          )}
        </tbody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30, 50]}
        rowsPerPage={rowsPerPage}
        page={page}
        count={patientData.length}
        component="div"
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowPerPageChange}
      >
      </TablePagination>
    </>

  );
};

export default DocumentList;


