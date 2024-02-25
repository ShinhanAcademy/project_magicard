import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard Materail-UI example components
import Table from "examples/Tables/Table";

// Data
import employeeData from "component_jw/data/Top5spendData/top5employee";

function Top5employee() {
  const { columns, rows } = employeeData();
 
  return (  
      <Table  columns={columns} rows={rows} />
  );
}

export default Top5employee;
