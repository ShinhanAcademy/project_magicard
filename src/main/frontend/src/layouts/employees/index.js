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

function Employees() {
  const { columns, rows } = employeesTableData();

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
                부서의 현황을 확인하고 추가, 수정, 삭제를 할 수 있습니다.
              </SoftTypography>
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
              <Table columns={columns} rows={rows} />
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
