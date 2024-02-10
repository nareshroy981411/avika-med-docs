
import React from "react";
import DocumentList from "../DocumentList";
import Headers from "../Header";
import { Container } from "react-bootstrap";
import { Button, Input, Select, Table, message } from "antd";
import { ExportOutlined, UserAddOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";

const DashboardPage = () => {
  const patientData = useSelector((state) => state?.authReducer?.getAllDocumentRecords);
  const loading = useSelector((state) => state.authReducer?.loading);
  const token = sessionStorage.getItem("token") || "";
  const columns = [{}]
  return (
    <>
      {/* <Headers /> */}
      {/* <Container style={{ paddingTop: "60px" }}></Container> */}
      {/* <DocumentList /> */}
      <section className="students-components-wrapper">
        <div className="results flex-sty">
          <div className="result flexDir-sty">
            <h1 className="student-header">All Patient Documents </h1>
            <div className="rssult-input flex-sty">
              <Input
               // onChange={searchTableData}
                placeholder="Search patient by name, age"
                type="text"
                allowClear
              />
              <button className="flex-sty gap-2 result-btn"
              >
                Search
              </button>
            </div>
          </div>

          <div className="result-data grid-sty" id="ml-3">
            <div className="itemblock">
              <div className="itemhead warm-red-bg"></div>
              <div className="itemcontent"></div>
            </div>

          </div>
        </div>
        <div className="flex-sty select-options">
          <div className="flex-sty select-option">
            <Select
              showSearch
              placeholder="Select a gender"
            //  onChange={filterTableData}
            // onSearch={onSearch}
            // filterOption={(input, option) =>
            //   (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            // }
            >
              <Select.Option value="selectGender">Select gender</Select.Option>
              <Select.Option label="Male" value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>

          </div>
          <div className="flex-sty select-btns">
            <Button type="primary" style={{}} onClick={" "}>
              <UserAddOutlined />Add
            </Button>
            <button className="flex-sty" id="lightblue-bg">
              <CSVLink
                filename={"patientDocument_List.csv"}
                data={patientData}
                style={{ color: "white" }}
                onClick={() => {
                  message.success("The file is downloading")
                }}
              >
                <ExportOutlined className="select-icon" />&nbsp;Export
              </CSVLink>
            </button>
          </div>
        </div>
        <Table
          bordered
          columns={columns}
          dataSource={patientData}
          loading={loading}
        />
      </section>
    </>
  );
};

export default DashboardPage;
