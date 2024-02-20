import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

import Card from "@mui/material/Card";
import Table from "examples/Tables/Table";
import Footer from "examples/Footer";
import RequestAllData from "../data/requestAllData";
import CheckContext from "component_sy/modal/checkModal";
import UpdateContext from "component_sy/modal/updateModal";

function RequestAll() {
  const {
    columns,
    rows,
    isModalOpen,
    handleModalOpen,
    handleModalClose,
    selectedPaymentId,
    sendRequest,
  } = RequestAllData();

  let modalComponent;
  if (sendRequest === "수정") {
    modalComponent = (
      <UpdateContext
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
              <SoftTypography variant="h4">승인 요청 내역</SoftTypography>
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

export default RequestAll;
