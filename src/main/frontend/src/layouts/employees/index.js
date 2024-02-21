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
import { Link } from "react-router-dom";
import SoftInput from "components/SoftInput";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import EmployeesFiltering from "./data/employeesFiltering";

function Employees() {
  const isLoggedIn = useSelector((state) => !!state.user.employeeCode);
  const [empList, setEmpList] = useState([]);
  const [activeButton, setActiveButton] = useState("전체");
  const [tableData, setTableData] = useState({ columns: [], rows: [], count: 0 });
  // const { columns, rows, count } = employeesTableData(empList);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const getEmployees = () => {
    if (isLoggedIn) {
      let url = "/emp/list/all"; // 기본 URL => 전체 직원 조회
      if (activeButton === "부서") {
        url = "/emp/list/dept/1";
      }
      console.log(url);
      axios
        .get(url)
        .then((response) => {
          if (response.data != "") {
            setEmpList(response.data);
          }
          console.log("n\n\n\n\n\nresponse.data\n\n\n\n\n" + response.data);
          console.log("웩웩웩" + response.data[1]);
          setTableData(employeesTableData(response.data));
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    getEmployees();
    console.log("empList : ", empList);
  }, []);

  useEffect(() => {
    getEmployees();
    console.log("empList : ", empList);
  }, [isLoggedIn, activeButton]);

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
              <EmployeesFiltering filter={activeButton} />
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
              <Table columns={tableData.columns} rows={tableData.rows} />
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
