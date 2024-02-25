import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

import Card from "@mui/material/Card";
import Table from "examples/Tables/Table";
import Footer from "examples/Footer";
import RequestApproveData from "../data/requestApproveData";
import CheckContext from "component_sy/modal/checkModal";

function RequestApprove() {
  const { columns, rows, isModalOpen, handleModalOpen, handleModalClose, selectedId, sendRequest } =
    RequestApproveData();

  let modalComponent;
  if (sendRequest === "수정") {
    modalComponent = (
      <CheckContext isOpen={isModalOpen} closeModal={handleModalClose} selectedId={selectedId} />
    );
  } else if (sendRequest === "조회") {
    modalComponent = (
      <CheckContext isOpen={isModalOpen} closeModal={handleModalClose} selectedId={selectedId} />
    );
  }

  return (
    <>
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
              <SoftTypography variant="h4">승인 내역</SoftTypography>
              <SoftTypography variant="h6" fontWeight="light" color="secondary">
                승인된 요청 내역을 볼 수 있습니다.
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
      </SoftBox>
      <Footer />
      {modalComponent}
    </>
  );
}

export default RequestApprove;
