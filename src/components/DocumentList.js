import React, { useEffect, useReducer, useState } from "react";
import { Form, Table, Button, Col, Row, Tooltip, OverlayTrigger } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress, TablePagination } from "@mui/material";
import DatePicker from "react-datepicker";
import { FaCalendarAlt, FaSyncAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import empty from "../assets/empty-folder.png";
import { useDispatch, useSelector } from "react-redux";
import { getDocumentsAction } from "../actions/medActions";
import "../App.css";

const initialState = {
  searchTerm: "",
  selectedDate: null,
  filteredPatientData: [],
  searchResultMessage: "",
  page: 0,
  rowsPerPage: 10,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_SELECTED_DATE":
      return { ...state, selectedDate: action.payload };
    case "SET_FILTERED_PATIENT_DATA":
      return { ...state, filteredPatientData: action.payload };
    case "SET_SEARCH_RESULT_MESSAGE":
      return { ...state, searchResultMessage: action.payload };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_ROWS_PER_PAGE":
      return { ...state, rowsPerPage: action.payload };
    default:
      return state;
  }
};

const DocumentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useReducer(reducer, initialState);
  const [selectedGender, setSelectedGender] = useState("");
  const [searchType, setSearchType] = useState("name"); // Default search type

  const [render, setRender] = useState(0);

  const {
    searchTerm,
    selectedDate,
    filteredPatientData,
    searchResultMessage,
    page,
    rowsPerPage,
  } = state;

  const patientData = useSelector((state) => state?.authReducer?.getAllDocumentRecords);
  const loading = useSelector((state) => state.authReducer?.loading);
  const token = sessionStorage.getItem("token") || "";

  const handlePageChange = (e, p) => setState({ type: "SET_PAGE", payload: p });

  const handleRowPerPageChange = (e) => {
    setState({ type: "SET_ROWS_PER_PAGE", payload: e?.target?.value });
    setState({ type: "SET_PAGE", payload: 0 });
  };

  const fetchData = async () => {
    if (token) {
      await dispatch(getDocumentsAction(token));
    }
  };

  useEffect(() => {
    fetchData();
    console.log("token", token);
  }, [dispatch, token, navigate, render]);

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        setRender(render + 1);
      }, 500);
    }
  }, []);

  useEffect(() => {
    setState({ type: "SET_FILTERED_PATIENT_DATA", payload: patientData });
  }, [patientData]);

  useEffect(() => {
    if (selectedDate) {
      const filteredData = patientData?.filter(
        (patient) =>
          new Date(patient?.created_at)?.toLocaleDateString("en-CA") ===
          selectedDate?.toLocaleDateString("en-CA")
      );
      setState({ type: "SET_FILTERED_PATIENT_DATA", payload: filteredData });
    } else {
      setState({ type: "SET_FILTERED_PATIENT_DATA", payload: patientData });
    }
  }, [selectedDate, patientData]);

  const handleSearch = () => {
    const lowerCaseSearchTerm = searchTerm?.toLowerCase();
    let filteredData = [...patientData];
    if (searchType === "name" && searchTerm) {
      filteredData = filteredData.filter(patient =>
        patient.patient_name.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    if (searchType === "age" && searchTerm) {
      filteredData = filteredData.filter(patient =>
        patient.age.toString().includes(searchTerm)
      );
    }
    if (searchType === "op_number" && searchTerm) {
      filteredData = filteredData.filter(patient =>
        patient.op_number.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    if (searchType === "ip_number" && searchTerm) {
      filteredData = filteredData.filter(patient =>
        patient.ip_number.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    if (searchType === "gender" && searchTerm) {
      filteredData = filteredData.filter(patient =>
        patient.gender.toLowerCase() === lowerCaseSearchTerm
      );
    }
    if (selectedDate) {
      filteredData = filteredData.filter(patient =>
        new Date(patient.created_at).toLocaleDateString("en-CA") === selectedDate.toLocaleDateString("en-CA")
      );
    }
    if (selectedGender) {
      filteredData = filteredData.filter(patient =>
        patient.gender.toLowerCase() === selectedGender.toLowerCase()
      );
    }

    setState({
      type: "SET_SEARCH_RESULT_MESSAGE",
      payload: filteredData.length === 0 ? "No matching records found" : "",
    });

    setState({ type: "SET_FILTERED_PATIENT_DATA", payload: filteredData });
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const clearFilters = async () => {
    setState({
      type: "SET_SEARCH_TERM",
      payload: "",
    });
    setState({
      type: "SET_SELECTED_DATE",
      payload: null,
    });
    setSelectedGender("");
    await fetchData();
  };

  return (
    <>
      <div
        style={{
          maxWidth: "100%",
          overflowX: "hidden",
          margin: "10px",
          position: "relative",
        }}
      >
        <Row>
          <Col xs={12} md={6} lg={6}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className="d-flex m-2"
              style={{ position: "sticky", top: "10px", zIndex: 100, background: "#fff" }}
            >
              <Form.Group controlId="searchTerm" as={Col} xs={12} md={8}>
                <div style={{ position: "relative" }}>
                  <Form.Control
                    type={searchType === "age" ? "number" : "text"}
                    placeholder={`Search by ${searchType}`}
                    value={searchTerm}
                    onChange={(e) => setState({ type: "SET_SEARCH_TERM", payload: e?.target?.value })}
                  />
                  {/* {searchType === "age" && (
                    <Form.Text className="text-muted">
                      Please enter the age as a number.
                    </Form.Text>
                  )} */}
                  <div style={{ position: "absolute", right: "30px", top: "50%", transform: "translateY(-50%)" }}>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setState({ type: "SET_SELECTED_DATE", payload: date })}
                      dateFormat="yyyy-MM-dd"
                      className="form-control d-none"
                    />
                    <FaCalendarAlt
                      onClick={() =>
                        document.querySelector(".react-datepicker-wrapper input").click()
                      }
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              </Form.Group>
              <Form.Group as={Col} xs={12} md={3} style={{ marginRight: "10px" }}>
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleSearchTypeChange}
                  value={searchType}
                  placeholder="Select search type"
                >
                  <option value="name">Name</option>
                  <option value="age">Age</option>
                  <option value="op_number">OP Number</option>
                  <option value="ip_number">IP Number</option>
                  <option value="gender">Gender</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} xs={12} md={4} className="d-flex align-items-center ml-md-2">
                <Button
                  type="submit"
                  style={{ marginTop: "0px", marginLeft: "10px", backgroundColor: "#91D4D1" }}
                  className="btnSearch"
                >
                  Search
                </Button>
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="clear-filters-tooltip">Clear Filters</Tooltip>}
                >
                  <Button
                    variant="outline-secondary"
                    onClick={clearFilters}
                    style={{ marginLeft: "10px", backgroundColor:"#063B59" }}
                  >
                    <FaSyncAlt  color="#FAA61A"/>
                  </Button>
                </OverlayTrigger>
              </Form.Group>
            </Form>
          </Col>
          <Col xs={12} md={6} lg={6} className="text-end mt-3">
            <span style={{ fontSize: 15, backgroundColor: "#FAA61A", color: "#FFF", borderRadius: "8px", padding: "7px" }}>
              {selectedDate ? `${selectedDate?.toLocaleDateString("en-CA")} Documents` : "All Documents"} : {filteredPatientData?.length}
            </span>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <div style={{ overflowX: "auto", minWidth: "100%", minHeight: "150px" }}>
              <Table centered striped bordered hover style={{ minWidth: "100%", zIndex: 100, textAlign: "center" }}>
                <thead>
                  <tr>
                    <th>S.NO</th>
                    <th>Patient Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Date of Registration</th>
                    <th>Uploaded Date</th>
                    <th>IP Number</th>
                    <th>OP Number</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatientData
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    ?.map((patient, index) => (
                      <tr key={patient?.id}>
                        <td>{page * rowsPerPage + index + 1}</td>
                        <td>{patient?.patient_name}</td>
                        <td>{patient?.age}</td>
                        <td>{patient?.gender}</td>
                        <td>{patient?.Date_of_registration}</td>
                        <td>
                          {new Date(patient?.created_at)?.toLocaleDateString("en-CA")}
                        </td>
                        <td>{patient?.ip_number}</td>
                        <td>{patient?.op_number}</td>
                        <td>
                          <Link to={`/PatientDetails/${patient?.id}`}>
                            <Button style={{ backgroundColor: "#063B59" }}>Details</Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
            {filteredPatientData?.length === 0 && (
              <p style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{searchResultMessage || <img src={empty} alt="No records found" />}</p>
            )}
          </Col>
          <Col xs={12} style={{ position: "fixed", bottom: 0, zIndex: 100, background: "#fff", maxHeight: "36px" }}>
            <TablePagination
              rowsPerPageOptions={[10]}
              rowsPerPage={rowsPerPage}
              page={page}
              count={filteredPatientData?.length}
              component="div"
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowPerPageChange}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DocumentList;
