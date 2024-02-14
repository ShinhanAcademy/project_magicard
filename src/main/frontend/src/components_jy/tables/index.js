/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";
import axios from "axios";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DeptDetail from "components_jy/Table/DeptDetail";

// Soft UI Dashboard React examples
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { useEffect, useState } from "react";

import "./tbl.css";

function Tablesjy() {
  const { columns, rows } = authorsTableData;
  const { columns: prCols, rows: prRows } = projectsTableData;
  const [deptList, setDeptList] = useState([]);
  const [departmentId, setDepartmentId] = useState();
  const [deptDetail, setDeptDetail] = useState([]);

  //전체 list 추출
  useEffect(() => {
    axios({
      method: "Get",
      url: "/department/listall",
    })
      .then((res) => {
        console.log(res.data);
        setDeptList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEditClick = (department_id) => {
    console.log("Selected departmentId:", department_id);
    setDepartmentId(department_id);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Departments table</SoftTypography>
            </SoftBox>
            <SoftBox>{departmentId && <DeptDetail departmentId={departmentId} />}</SoftBox>
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
              {/* <Table columns={columns} rows={rows} /> */}
              <table>
                <thead>
                  <tr>
                    <td>부서</td>
                    <td>부서장</td>
                    <td>총인원</td>
                    <td>수정</td>
                  </tr>
                </thead>
                <tbody>
                  {deptList.map((dept) => (
                    <tr key={dept.departmentId}>
                      <td>{dept.departmentId}</td>
                      <td style={dept.employeeName == null ? { color: "#e9ecef" } : {}}>
                        <p>{dept.employeeName == null ? "미정" : dept.employee_name}</p>
                        <p style={{ fontSize: "0.7rem", color: "gray" }}>
                          {" "}
                          {dept.employeeName == null ? "" : dept.employeeEmail}
                        </p>
                      </td>
                      <td>{dept.membernum}</td>
                      <td>
                        <button
                          className="depttblbtn"
                          onClick={() => handleEditClick(dept.departmentId)}
                        >
                          수정하기
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tablesjy;
