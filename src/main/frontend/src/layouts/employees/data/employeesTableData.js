/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";
import axios from "axios";

function employeesTableData() {
  const [empList, setEmpList] = useState([]);

  const getEmployees = () => {
    axios
      .get("/emp/list/all")
      .then((response) => {
        if (response.data != "") {
          setEmpList(response.data);
        }
        console.log("n\n\n\n\n\nresponse.data\n\n\n\n\n" + response.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getEmployees();
    console.log("empList : ", empList);
  }, []);

  function Employee({ employeeCode, name, email }) {
    return (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <SoftBox mr={3}>
          <SoftTypography variant="button" fontWeight="medium">
            {employeeCode}
          </SoftTypography>
        </SoftBox>
        <SoftBox display="flex" flexDirection="column">
          <SoftTypography variant="button" fontWeight="medium">
            {name}
          </SoftTypography>
          <SoftTypography variant="caption" color="secondary">
            {email}
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    );
  }

  function Function({ rank }) {
    return (
      <>
        <SoftBox display="flex" flexDirection="column">
          <SoftTypography variant="caption" fontWeight="medium" color="text">
            {rank}
          </SoftTypography>
        </SoftBox>
      </>
    );
  }

  const rows = empList.map((emp) => {
    return {
      사원: (
        <Employee
          employeeCode={emp.employeeCode}
          name={emp.employeeName}
          email={emp.employeeEmail}
        />
      ),
      직급: <Function rank={emp.employeeRank.rankName} />,
      입사일: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {emp.hireDate.substr(0, 10)}
        </SoftTypography>
      ),
      상급조직: (
        <SoftBadge
          variant="gradient"
          badgeContent={emp.superDepartment ? emp.superDepartment.departmentName : "-"}
          color="success"
          size="xs"
          container
        />
      ),
      소속조직: (
        <SoftBadge
          variant="gradient"
          badgeContent={emp.department.departmentName}
          color="success"
          size="xs"
          container
        />
      ),
      권한: (
        <SoftTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          {emp.authority}
        </SoftTypography>
      ),
    };
  });

  const data = {
    columns: [
      { name: "사원", align: "left" },
      { name: "직급", align: "center" },
      { name: "입사일", align: "center" },
      { name: "상급조직", align: "center" },
      { name: "소속조직", align: "center" },
      { name: "권한", align: "center" },
    ],

    rows,
  };

  return data;
}

export default employeesTableData;
