import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPatientDetails } from "../actions/medActions";
import { Button, Card } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./patientDetails.scss"

const PatientDetails = ({ token }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { id } = useParams();
  const patientDetails = useSelector((state) => state?.authReducer?.patientDetails?.data);

  useEffect(() => {
    dispatch(getPatientDetails(id, token));
  }, [dispatch, id, token]);


  if (!patientDetails) {
    return (
      <h2>Details not available for this document</h2>
    );
  }
  const handleGoBack = () => {
    navigate(-1)
  }
  return (
    <>
      <section className="patientDetails-container">
        <div className="patientDetails-header">
          <div onClick={handleGoBack} style={{cursor:"pointer"}}>
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="17" cy="17" r="16" stroke="#C4C4C4" stroke-width="1.5" />
              <path d="M20 10L13 17L20 24" stroke="#262626" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </div>
          <h3>Details of:&nbsp;{patientDetails?.patient_name}</h3>
          <Button style={{ backgroundColor: "#063B59", color: "#FFFFFF" }}>
            <a
              href={patientDetails?.file_path}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              View File
            </a>
          </Button>
        </div>
        <Card title="Patient Details" className="patient-details-card">
          <div className="patient-details-row">
            <span className="patient-details-label">Patient Name</span>
            <span className="patient-details-colon">:</span>
            <span className="patient-details-value">{patientDetails?.patient_name}</span>
          </div>
          <div className="patient-details-row">
            <span className="patient-details-label">Age</span>
            <span className="patient-details-colon">:</span>
            <span className="patient-details-value">{patientDetails?.age}</span>
          </div>
          <div className="patient-details-row">
            <span className="patient-details-label">Date of Registration</span>
            <span className="patient-details-colon">:</span>
            <span className="patient-details-value">{patientDetails?.Date_of_registration}</span>
          </div>
          <div className="patient-details-row">
            <span className="patient-details-label">Ip Number</span>
            <span className="patient-details-colon">:</span>
            <span className="patient-details-value">{patientDetails?.ip_number}</span>
          </div>
          <div className="patient-details-row">
            <span className="patient-details-label">Op Number</span>
            <span className="patient-details-colon">:</span>
            <span className="patient-details-value">{patientDetails?.op_number}</span>
          </div>
          <div className="patient-details-row">
            <span className="patient-details-label">Place</span>
            <span className="patient-details-colon">:</span>
            <span className="patient-details-value">{patientDetails?.place}</span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default PatientDetails;