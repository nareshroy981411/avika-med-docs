import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Headers from "./Header";

const PatientDetails = ({ token }) => {
  const { id } = useParams();

  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(id);

        const response = await axios.get(
          `https://med.avika.ai/admin/getMedicalRecord/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            // responseType: 'blob', // Specify that the response is a blob
          }
        );
        console.log("Response data:", response.data);
        setDetails(response?.data);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchData();
  }, [id, token]);

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Headers />
      <Container className="mt-4">
        <h2 className="text-center mb-4">
          Details of: {details.data.patient_name}
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
                  {details.data.id}
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
                  {details.data.patient_name}
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
                  {details.data.age}
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
                  {details.data.Date_of_registration}
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
                  {details.data.ip_number}
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
                  {details.data.op_number}
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
                  {details.data.place}
                </p>
              </Col>
              <Col>
              <Button>
                <a
                  href={details.data.file_path}
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
