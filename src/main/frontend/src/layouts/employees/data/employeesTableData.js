/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";
import axios from "axios";
import { useSelector } from "react-redux";

function employeesTableData(empList) {
  console.log("employeesTableData", empList);
  function Employee({ employeeCode, name, email }) {
    return (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <SoftBox width={70} mr={5}>
          <SoftTypography variant="h6" fontWeight="medium">
            {employeeCode}
          </SoftTypography>
        </SoftBox>
        <SoftBox display="flex" flexDirection="column">
          <SoftTypography variant="body2" fontWeight="medium">
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
          <SoftTypography variant="body3" fontWeight="medium" color="text">
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
        <SoftTypography variant="body3" color="secondary" fontWeight="medium">
          {emp.hireDate.substr(0, 10)}
        </SoftTypography>
      ),
      상급조직: (
        <SoftTypography variant="body3" color="text" fontWeight="medium">
          {emp.superDepartment ? emp.superDepartment.departmentName : "-"}
        </SoftTypography>
      ),
      소속조직: (
        <SoftTypography variant="body3" color="text" fontWeight="medium">
          {emp.department.departmentName}
        </SoftTypography>
      ),
      권한: (
        <SoftTypography
          variant="body3"
          color={emp.authority == "관리자" ? "info" : "text"}
          fontWeight="medium"
        >
          {emp.authority}
        </SoftTypography>
      ),
    };
  });

  const empListLength = empList.length;

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
    count: empListLength,
  };

  return data;
}

export default employeesTableData;
