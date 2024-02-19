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
import { useEffect, useState } from "react";

import "./tbl.css";

function Tablesjy() {
  const [deptList, setDeptList] = useState([]);
  const [departmentId, setDepartmentId] = useState();

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
                  {deptList.map((dept, ind) => (
                    <tr key={ind}>
                      <td>{dept.department_id}</td>
                      <td style={dept.employee_name == null ? { color: "#e9ecef" } : {}}>
                        <p>{dept.employee_name == null ? "미정" : dept.employee_name}</p>
                        <p style={{ fontSize: "0.7rem", color: "gray" }}>
                          {" "}
                          {dept.employee_name == null ? "" : dept.employee_email}
                        </p>
                      </td>
                      <td>{dept.membernum}</td>
                      <td>
                        <button
                          className="depttblbtn"
                          onClick={() => handleEditClick(dept.department_id)}
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
