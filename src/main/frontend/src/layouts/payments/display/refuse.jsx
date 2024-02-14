import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

import Card from "@mui/material/Card";

import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import RefuseData from "../data/refuseData";

function Refuse() {
  const { columns, rows } = RefuseData();
  return (
    <>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h4">반려 내역</SoftTypography>
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
      </SoftBox>
      <Footer />
    </>
  );
}

export default Refuse;
