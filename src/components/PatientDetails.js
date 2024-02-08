import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Headers from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { getPatientDetails } from "../actions/medActions";
import { CircularProgress } from "@mui/material";

const PatientDetails = ({ token }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const patientDetails = useSelector((state) => state?.authReducer?.patientDetails?.data);
  const loading = useSelector((state) => state?.authReducer?.loading);

  useEffect(() => {
    dispatch(getPatientDetails(id, token));
  }, [dispatch, id, token]);

  if (loading) {
    return (
      <Container className="mt-4" style={{ textAlign: "center" }}>
        <CircularProgress style={{ marginTop: "20px" }} />
      </Container>
    );
  }
  if (!patientDetails) {
    return (
      <Container className="mt-4" style={{ textAlign: "center" }}>
        <h2>Details not available for this document</h2>
      </Container>
    );
  }
  return (
    <>
      <Headers />
      <Container className="mt-4">
        <h2 className="text-center mb-4">
          Details of: {patientDetails?.patient_name}
        </h2>
        <Card style={{ backgroundColor: "#f0f0f0" }}>
          <Card.Body>
            <Row>
              <Col md={6}>
                <p>
                  <span
                    style={{
                      fontSize: "18px",
                      color: "#333",
                      fontWeight: "bold",
                    }}
                  >
                    ID:
                  </span>{" "}
                  {patientDetails?.id}
                </p>
                <p>
                  <span
                    style={{
                      fontSize: "16px",
                      color: "#555",
                      fontWeight: "bold",
                    }}
                  >
                    Patient Name:
                  </span>{" "}
                  {patientDetails?.patient_name}
                </p>
                <p>
                  <span
                    style={{
                      fontSize: "16px",
                      color: "#555",
                      fontWeight: "bold",
                    }}
                  >
                    Age:
                  </span>{" "}
                  {patientDetails?.age}
                </p>
                <p>
                  <span
                    style={{
                      fontSize: "16px",
                      color: "#555",
                      fontWeight: "bold",
                    }}
                  >
                    Date of Registration:
                  </span>{" "}
                  {patientDetails?.Date_of_registration}
                </p>
              </Col>
              <Col md={6}>
                <p>
                  <span
                    style={{
                      fontSize: "16px",
                      color: "#555",
                      fontWeight: "bold",
                    }}
                  >
                    IP-Number:
                  </span>{" "}
                  {patientDetails?.ip_number}
                </p>
                <p>
                  <span
                    style={{
                      fontSize: "16px",
                      color: "#555",
                      fontWeight: "bold",
                    }}
                  >
                    OP-Number:
                  </span>{" "}
                  {patientDetails?.op_number}
                </p>
                <p>
                  <span
                    style={{
                      fontSize: "16px",
                      color: "#555",
                      fontWeight: "bold",
                    }}
                  >
                    Plase:
                  </span>{" "}
                  {patientDetails?.place}
                </p>
              </Col>
              <Col>
                <Button>
                  <a
                    href={patientDetails?.file_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "blue" }}
                  >
                    View File
                  </a>
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default PatientDetails;
