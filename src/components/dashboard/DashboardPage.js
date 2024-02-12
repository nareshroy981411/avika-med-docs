import React, { useEffect, useRef, useState } from "react";
import { Button, DatePicker, Input, Select, Space, Table } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/en-au";
import Highlighter from 'react-highlight-words';
import "./Dashboard.scss";
import { Link, useNavigate } from "react-router-dom";
import { getDocumentsAction } from "../../actions/medActions";

const { RangePicker } = DatePicker;
const { Option } = Select;

const DashboardPage = ({ token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const patientData = useSelector((state) => state?.authReducer?.getAllDocumentRecords);

  const [searchValue, setSearchValue] = useState("");
  const [selectedGender, setSelectedGender] = useState(null);
  const [uploadedDateRange, setUploadedDateRange] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const clearFilters = async () => {
    setSearchValue('');
    setSelectedGender(null);
    setUploadedDateRange(null);
    setSearchText('');
    setSearchedColumn('');
    await fetchData();
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = async (clearFilters) => {
    clearFilters();
    setSearchText('');
    setSearchedColumn('');
  };

  const disabledDate = current => {
    return current && current > moment().endOf('day');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : '#FFFFFF',
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const fetchData = async () => {
    if (token) {
      dispatch(getDocumentsAction(token))
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, token, navigate]);

  useEffect(() => {
    const newFilteredData = patientData.filter(patient => {
      const searchByNameAge =
        patient.patient_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        patient.age.toString().includes(searchValue.toLowerCase());

      const filterByGender = !selectedGender || patient.gender.toLowerCase() === selectedGender.toLowerCase();

      const filterByUploadedDate = !uploadedDateRange || (
        moment(patient.created_at) >= uploadedDateRange[0].startOf("day") &&
        moment(patient.created_at) <= uploadedDateRange[1].endOf("day")
      );

      return searchByNameAge && filterByGender && filterByUploadedDate;
    });
    setFilteredData(newFilteredData);
    setCurrentPage(1);
  }, [patientData, searchValue, selectedGender, uploadedDateRange]);

  const columns = [
    {
      title: 'S.NO',
      dataIndex: 'sno',
      key: 'sno',
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: 'Patient Name',
      dataIndex: 'patient_name',
      key: 'patient_name',
      sorter: (a, b) => a.patient_name.localeCompare(b.patient_name),
      width: 200
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => +a.age - +b.age,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      sorter: (a, b) => a.gender.localeCompare(b.gender),
    },
    {
      title: 'Date of Registration',
      dataIndex: 'Date_of_registration',
      key: 'Date_of_registration',
      width: 150
    },
    {
      title: 'Uploaded Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (createdAt) => {
        const date = new Date(createdAt);
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        return formattedDate;
      },
      width: 150
    },
    {
      title: 'IP Number',
      dataIndex: 'ip_number',
      key: 'ip_number',
      ...getColumnSearchProps('ip_number'),
      width: 150
    },
    {
      title: 'OP Number',
      dataIndex: 'op_number',
      key: 'op_number',
      ...getColumnSearchProps('op_number'),
      width: 150
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => <Link to={`/PatientDetails/${record?.id}`}>
        <Button style={{ backgroundColor: "#063B59", color: "#FFFFFF" }}>Details</Button>
      </Link>,
    },
  ];

  return (
    <>
      <main className="dashboard-container">
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0px 10px" }}>
          <h4 className="dashboard-header">All Document Records</h4>
          <p style={{ fontSize: 15, backgroundColor: "#FAA61A", color: "#FFF", borderRadius: "8px", padding: "7px" }}>
            All Documents&nbsp;{filteredData.length}
          </p>
        </div>
        <div className="header-wrapper">
          <div className="header-leftSide">
            <Input
              style={{ width: "300px", marginRight: "10px" }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search patient"
              autoFocus
              allowClear
            />
            <Select
              style={{ width: "150px", marginRight: "10px" }}
              placeholder="Select gender"
              value={selectedGender}
              onChange={(value) => setSelectedGender(value)}
              allowClear
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
            <Button
              variant="outline-secondary"
              onClick={clearFilters}
              style={{ marginLeft: "10px", backgroundColor: "#063B59", color: "#FFFFFF", paddingBottom: "8px" }}
            >
              <ReloadOutlined color="#FAA61A" style={{ verticalAlign: "unset" }} />
            </Button>
          </div>
          <div className="header-rightSide">
            <Space style={{ alignItems: 'center' }}>
              <label htmlFor="uploaded_dates" style={{ fontSize: 17, marginBottom: 0 }}>Search uploaded records</label>
              <RangePicker
                id={'uploaded_dates'}
                style={{ marginRight: "10px" }}
                format="MM/DD/YYYY"
                onChange={(dates) => { console.log(dates); setUploadedDateRange(dates) }}
                disabledDate={disabledDate}
              />
            </Space>
          </div>
        </div>
        <div className="table-wrapper">
          <Table
            columns={columns}
            dataSource={filteredData}
            scroll={{ y: 350 }}
            bordered
            pagination={{
              pageSize: pageSize,
              current: currentPage,
              onChange: setCurrentPage,
              onShowSizeChange: (current, size) => setPageSize(size),
              showSizeChanger: true,
              pageSizeOptions: ['10', '50', '100'],
            }}
            rowClassName={() => 'custom-table-row'}
            headerClassName={() => 'custom-table-header'}
          />
        </div>
      </main >
    </>
  );
};

export default DashboardPage;
