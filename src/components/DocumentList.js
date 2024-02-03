import React, { useEffect, useReducer } from "react";
import { Form, Table, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CircularProgress, TablePagination } from "@mui/material";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import empty from "../assets/empty-folder.png"
import { useDispatch, useSelector } from "react-redux";
import { getDocumentsAction } from "../actions/medActions";

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
  const [state, setState] = useReducer(reducer, initialState);

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

  useEffect(() => {
    dispatch(getDocumentsAction());
  }, [dispatch, token]);

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

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  const handleSearch = () => {
    const lowerCaseSearchTerm = searchTerm?.toLowerCase();
    const filteredData = patientData?.filter((patient) => {
      const createdAtDate = new Date(patient?.created_at)?.toLocaleDateString(
        "en-CA"
      );
      if (lowerCaseSearchTerm === "male") {
        return (
          patient?.patient_name?.toLowerCase()?.includes(lowerCaseSearchTerm) ||
          patient?.age?.toString()?.includes(searchTerm) ||
          patient?.gender?.toLowerCase() === "male" ||
          createdAtDate?.includes(searchTerm) ||
          (selectedDate &&
            new Date(patient?.created_at)?.toLocaleDateString("en-CA") ===
            selectedDate?.toLocaleDateString("en-CA"))
        );
      } else if (lowerCaseSearchTerm === "female") {
        return (
          patient?.patient_name?.toLowerCase()?.includes(lowerCaseSearchTerm) ||
          patient?.age?.toString()?.includes(searchTerm) ||
          patient?.gender?.toLowerCase() === "female" ||
          createdAtDate?.includes(searchTerm) ||
          (selectedDate &&
            new Date(patient?.created_at)?.toLocaleDateString("en-CA") ===
            selectedDate?.toLocaleDateString("en-CA"))
        );
      } else {
        return (
          patient?.patient_name?.toLowerCase()?.includes(lowerCaseSearchTerm) ||
          patient?.age?.toString()?.includes(searchTerm) ||
          createdAtDate?.includes(searchTerm) ||
          (selectedDate &&
            new Date(patient?.created_at)?.toLocaleDateString("en-CA") ===
            selectedDate?.toLocaleDateString("en-CA"))
        );
      }
    });

    setState({
      type: "SET_SEARCH_RESULT_MESSAGE",
      payload: filteredData?.length === 0 ? "No matching records found" : ""
    });
    setState({ type: "SET_FILTERED_PATIENT_DATA", payload: filteredData });
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
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="d-flex m-2"
          style={{ position: "sticky", top: '10px', zIndex: 100, background: "#fff" }}
        >
          <Form.Group controlId="searchTerm" as={Col} xs={12} md={6}>
            <Form.Control
              type="text"
              placeholder="Search by patient name, age, gender"
              value={searchTerm}
              onChange={(e) => setState({ type: "SET_SEARCH_TERM", payload: e?.target?.value })}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            xs={12}
            md={6}
            className="d-flex align-items-center ml-md-2"
          >
            <div className="position-relative">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setState({ type: "SET_SELECTED_DATE", payload: date })}
                dateFormat="yyyy-MM-dd"
                className="form-control d-none"
              />
              <FaCalendarAlt
                onClick={() =>
                  document.querySelector(".react-datepicker-wrapper input")
                    .click()
                }
                className="position-absolute top-50 end-0 translate-middle-y text-primary me-2"
                style={{ cursor: "pointer" }}
              />
            </div>
            <Button
              variant="primary"
              type="submit"
              style={{ marginTop: "0px", marginLeft: "10px" }}
            >
              Search
            </Button>
          </Form.Group>
        </Form>
        <Row>
          <Col xs={12} className="d-flex justify-content-end">
            <span>
              {selectedDate
                ? `${selectedDate?.toLocaleDateString("en-CA")} Documents`
                : "All Documents"}{" "}
              : {filteredPatientData?.length}
            </span>
          </Col>
          <Col xs={12}>
            <div
              style={{
                overflowX: "auto",
                minWidth: "100%",
                minHeight: "150px",
              }}
            >
              <Table striped bordered hover style={{ minWidth: "100%", zIndex: 100 }}>
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
                  {filteredPatientData?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )?.map((patient, index) => (
                    <tr key={patient?.id}>
                      <td>{page * rowsPerPage + index + 1}</td>
                      <td>{patient?.patient_name}</td>
                      <td>{patient?.age}</td>
                      <td>{patient?.gender}</td>
                      <td>{patient?.Date_of_registration}</td>
                      <td>
                        {new Date(patient?.created_at)?.toLocaleDateString(
                          "en-CA"
                        )}
                      </td>
                      <td>{patient?.ip_number}</td>
                      <td>{patient?.op_number}</td>
                      <td>
                        <Link to={`/PatientDetails/${patient?.id}`}>
                          <Button variant="info">Details</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            {filteredPatientData?.length === 0 && (
              <p style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>{searchResultMessage || <img src={empty} alt="No records found" />}</p>
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
