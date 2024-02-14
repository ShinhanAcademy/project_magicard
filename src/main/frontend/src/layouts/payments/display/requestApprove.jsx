import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

import Card from "@mui/material/Card";
import Table from "examples/Tables/Table";
import Footer from "examples/Footer";
import RequestApproveData from "../data/requestApproveData";

function RequestApprove() {
  const { columns, rows } = RequestApproveData();
  return (
    <>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              {/* <SoftTypography variant="h5">이번 달 결제 금액</SoftTypography>
              <SoftTypography variant="h5">이번 달 잔액</SoftTypography> */}
              <SoftTypography variant="h4">승인 내역</SoftTypography>
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

export default RequestApprove;
