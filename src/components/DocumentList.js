import React, { useState, useEffect } from "react";
import { Form, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { TablePagination } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { baseUrl } from "../App";

const DocumentList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [patientData, setPatientData] = useState([]);
  const [filteredPatientData, setFilteredPatientData] = useState([]);
  const [searchResultMessage, setSearchResultMessage] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const token = sessionStorage.getItem("token");

  const handlePageChange = (e, p) => {
    e.preventDefault();
    setPage(p);
  };

  const handleRowPerPageChange = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  const getAllRecords = async () => {
    try {
      const response = await axios.get(`${baseUrl}/admin/records`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPatientData(response?.data?.data);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  const handleSearch = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredData = patientData.filter((patient) => {
      const createdAtDate = new Date(patient.created_at).toLocaleDateString(
        "en-CA"
      );
      return (
        patient.patient_name.toLowerCase().includes(lowerCaseSearchTerm) ||
        patient.age.toString().includes(searchTerm) ||
        patient.gender.toLowerCase().includes(lowerCaseSearchTerm) ||
        createdAtDate.includes(searchTerm) ||
        (selectedDate &&
          new Date(patient.created_at).toLocaleDateString("en-CA") ===
            selectedDate.toLocaleDateString("en-CA"))
      );
    });

    if (filteredData.length === 0) {
      setSearchResultMessage("No matching records found");
    } else {
      setSearchResultMessage("");
    }
    setFilteredPatientData(filteredData);
  };

  useEffect(() => {
    getAllRecords();
  }, [token]);

  useEffect(() => {
    setFilteredPatientData(patientData);
  }, [patientData]);

  useEffect(() => {
    if (selectedDate) {
      const filteredData = patientData.filter((patient) => {
        return (
          new Date(patient.created_at).toLocaleDateString("en-CA") ===
          selectedDate.toLocaleDateString("en-CA")
        );
      });
      setFilteredPatientData(filteredData);
    } else {
      setFilteredPatientData(patientData);
    }
  }, [selectedDate, patientData]);

  return (
    <>
    <div style={{ maxWidth: '100%', overflowX: 'auto',marginLeft:'40px' }}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="d-flex m-2"
      >
        <Form.Group controlId="searchTerm" className="w-50">
          <Form.Control
            className="w-75"
            type="text"
            placeholder="Search by patient name, age, gender"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
        <div className="d-flex align-items-center ml-2 w-20">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
            className="form-control mr-2 w-20"
          />
          <Button variant="primary" type="submit">
            Search
          </Button>
        </div>
      </Form>
      <Table striped bordered hover className='m-1' style={{ maxWidth: '98%', overflowX: 'auto' }}>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Date of Registration</th>
            <th>Created_at</th>
            <th>IP Number</th>
            <th>OP Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatientData.length === 0 ? (
            <tr>
              <td colSpan="7">
                {searchResultMessage || "No matching records found"}
              </td>
            </tr>
          ) : (
            filteredPatientData
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.patient_name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.Date_of_registration}</td>
                  <td>
                    {new Date(patient.created_at).toLocaleDateString("en-CA")}
                  </td>
                  <td>{patient.ip_number}</td>
                  <td>{patient.op_number}</td>
                  <td>
                    <Link to={`/PatientDetails/${patient.id}`}>
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
      />
      </div>
    </>
  );
};

export default DocumentList;
