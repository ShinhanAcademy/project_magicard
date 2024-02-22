// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import employeesTableData from "./data/employeesTableData";
import SoftPagination from "components/SoftPagination";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Select from "react-select";
import EmployeesFiltering from "./data/employeesFiltering";

function Employees() {
  const isLoggedIn = useSelector((state) => !!state.user.employeeCode);
  const [empList, setEmpList] = useState([]);
  const [activeButton, setActiveButton] = useState("전체");
  const [tableData, setTableData] = useState({ columns: [], rows: [], count: 0 });
  // const { columns, rows, count } = employeesTableData(empList);

  const [deptList, setDeptList] = useState([]);
  const [rankSelect, setRankSelect] = useState(null);
  const [deptSelect, setDeptSelect] = useState(null);
  const [authoritySelect, setAuthoritySelect] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const getEmployees = () => {
    if (isLoggedIn) {
      let url = "/emp/list/all"; // 기본 URL => 전체 직원 조회
      if (activeButton === "부서") {
        url = "/emp/list/dept/" + deptSelect;
      } else if (activeButton === "직급") {
        url = "/emp/list/rank/" + rankSelect;
      } else if (activeButton === "권한") {
        url = "/emp/list/authority/" + authoritySelect;
      }
      console.log("url!!!!!!!!!!!!!!!!!!!", url);
      axios
        .get(url)
        .then((response) => {
          if (response.data != "") {
            setEmpList(response.data);
          }
          console.log("n\n\n\n\n\nresponse.data\n\n\n\n\n" + response.data);
          setTableData(employeesTableData(response.data));
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    getEmployees();
    getDepartments();
    console.log("deptList..", deptList[0]);
    console.log("empList : ", empList);
  }, []);

  useEffect(() => {
    getEmployees();
    console.log("empList : ", empList);
  }, [isLoggedIn, activeButton, deptSelect, rankSelect, authoritySelect]);

  const customStyles = {
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "#A9B1BE",
        fontSize: "medium",
        fontWeight: "regular",
      };
    },
    option: (provided, state) => ({
      ...provided,
      fontSize: "medium",
    }),
    control: (provided, state) => ({
      ...provided,
      paddingLeft: "5px",
      borderRadius: "10px",
      borderColor: state.isFocused ? "#35D1F5" : "#d2d6da",
      boxShadow: state.isFocused ? "0 0 0 2px #81E3F9" : "none",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      fontSize: "medium",
    }),
    menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
  };

  const getDepartments = () => {
    axios
      .get("/department/listall")
      .then((response) => {
        if (response.data != "") {
          setDeptList(response.data);
        }
        console.log("부서들..", response.data[1]);
        console.log("부서들..0", response.data[0]);
      })
      .catch((error) => console.error(error));
  };

  const rank = [
    { value: 1, label: "회장" },
    { value: 2, label: "임원" },
    { value: 3, label: "부장" },
    { value: 5, label: "차장" },
    { value: 6, label: "과장" },
    { value: 8, label: "주임" },
    { value: 9, label: "사원" },
    { value: 10, label: "인턴" },
  ];

  const authority = [
    { value: 0, label: "일반" },
    { value: 1, label: "관리자" },
  ];

  const dept = deptList.map((item) => ({
    value: item.department_id,
    label: item.department_name,
  }));

  function RankResult() {
    return (
      <SoftBox>
        <Select
          styles={customStyles}
          placeholder="직급 선택"
          options={rank}
          onChange={(e) => {
            console.log(e);
            setDeptSelect(null);
            setAuthoritySelect(null);
            setRankSelect(e.value);
          }}
          value={rank.filter(function (option) {
            return option.value === rankSelect;
          })}
        />
      </SoftBox>
    );
  }

  function AuthorityResult() {
    return (
      <SoftBox>
        <Select
          styles={customStyles}
          placeholder="권한 선택"
          options={authority}
          onChange={(e) => {
            setRankSelect(null);
            setDeptSelect(null);
            setAuthoritySelect(e.value);
          }}
          value={authority.filter(function (option) {
            return option.value === authoritySelect;
          })}
        />
      </SoftBox>
    );
  }

  function DeptResult() {
    return (
      <SoftBox>
        <Select
          menuPortalTarget={document.body}
          styles={customStyles}
          placeholder="부서 선택"
          options={dept}
          onChange={(e) => {
            setRankSelect(null);
            setAuthoritySelect(null);
            setDeptSelect(e.value);
          }}
          value={dept.filter(function (option) {
            return option.value === deptSelect;
          })}
        />
      </SoftBox>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              alignItems="flex-start"
              p={3}
            >
              <SoftTypography variant="h6" fontWeight="bold">
                직원 관리
              </SoftTypography>
              <SoftTypography variant="h6" fontWeight="light" color="secondary">
                직원의 현황을 확인하고 등록, 수정, 삭제를 할 수 있습니다.
              </SoftTypography>
            </SoftBox>
            <SoftBox display="flex" pl={3} pb={2}>
              <SoftBox mr={2}>
                <SoftButton
                  color={activeButton === "전체" ? "success" : "light"}
                  onClick={() => handleButtonClick("전체")}
                >
                  <SoftTypography variant="h6" fontWeight="bold" color="dark">
                    전체
                  </SoftTypography>
                </SoftButton>
              </SoftBox>
              <SoftBox mr={2}>
                <SoftButton
                  color={activeButton === "부서" ? "success" : "light"}
                  onClick={() => handleButtonClick("부서")}
                >
                  <SoftTypography variant="h6" fontWeight="bold" color="dark">
                    부서
                  </SoftTypography>
                </SoftButton>
              </SoftBox>
              <SoftBox mr={2}>
                <SoftButton
                  color={activeButton === "직급" ? "success" : "light"}
                  onClick={() => handleButtonClick("직급")}
                >
                  <SoftTypography variant="h6" fontWeight="bold" color="dark">
                    직급
                  </SoftTypography>
                </SoftButton>
              </SoftBox>
              <SoftBox mr={2}>
                <SoftButton
                  color={activeButton === "권한" ? "success" : "light"}
                  onClick={() => handleButtonClick("권한")}
                >
                  <SoftTypography variant="h6" fontWeight="bold" color="dark">
                    권한
                  </SoftTypography>
                </SoftButton>
              </SoftBox>
              <SoftBox display="flex" alignItems="center">
                {activeButton == "부서" ? (
                  <DeptResult />
                ) : activeButton == "직급" ? (
                  <RankResult />
                ) : activeButton == "권한" ? (
                  <AuthorityResult />
                ) : null}
              </SoftBox>
            </SoftBox>
            <SoftBox display="flex" justifyContent="space-between" pl={5} pr={5} pb={3}>
              <SoftTypography display="flex" alignItems="center">
                <SoftTypography fontWeight="bold" variant="body2">
                  대상자&nbsp;&nbsp;&nbsp;
                </SoftTypography>
                <SoftTypography variant="body1" fontWeight="bold" color="success">
                  {tableData.count}
                </SoftTypography>
              </SoftTypography>

              <SoftBox>
                <SoftInput
                  placeholder="사번/이름"
                  icon={{ component: "search", direction: "left" }}
                />
              </SoftBox>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              {isLoggedIn ? (
                <Table columns={tableData.columns} rows={tableData.rows} />
              ) : (
                <SoftBox display="flex" justifyContent="center" mt={15} mb={15}>
                  <SoftTypography variant="h5" color="secondary">
                    ^_^v
                  </SoftTypography>
                </SoftBox>
              )}
            </SoftBox>
          </Card>
        </SoftBox>
        {/* <SoftPagination></SoftPagination> */}
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Employees;
