
import React from "react";
import DocumentList from "./DocumentList";
import Headers from "./Header";
import { Container } from "react-bootstrap"; 

const DashboardPage = () => {
  return (
    <>
    <Headers/>
    <Container style={{ paddingTop: "60px" }}></Container>
      <DocumentList />
    </>
  );
};

export default DashboardPage;
