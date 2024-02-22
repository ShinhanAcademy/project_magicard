import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

import Card from "@mui/material/Card";
import Table from "examples/Tables/Table";
import Footer from "examples/Footer";
import RequestApproveData from "../data/requestApproveData";
import CheckContext from "component_sy/modal/checkModal";

function RequestApprove() {
  const {
    columns,
    rows,
    isModalOpen,
    handleModalOpen,
    handleModalClose,
    selectedPaymentId,
    sendRequest,
  } = RequestApproveData();

  let modalComponent;
  if (sendRequest === "수정") {
    modalComponent = (
      <CheckContext
        isOpen={isModalOpen}
        closeModal={handleModalClose}
        selectedPaymentId={selectedPaymentId}
      />
    );
  } else if (sendRequest === "조회") {
    modalComponent = (
      <CheckContext
        isOpen={isModalOpen}
        closeModal={handleModalClose}
        selectedPaymentId={selectedPaymentId}
      />
    );
  }

  return (
    <>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
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
      {modalComponent}
    </>
  );
}

export default RequestApprove;
