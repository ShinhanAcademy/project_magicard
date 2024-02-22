import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

import Card from "@mui/material/Card";

import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

import "layouts/payments/display/paymentsInfo.css";
import RequestToMeData from "../data/requestToMeData";
import UpdateContext from "component_sy/modal/updateModal";
import CheckContext from "component_sy/modal/checkModal";
import ConfirmContext from "component_sy/modal/confirmModal";
import { useEffect, useState } from "react";
import axios from "axios";

function RequestToMe() {
  const [requestCount, setRequestCount] = useState(0);

  const { columns, rows, isModalOpen, handleModalOpen, handleModalClose, selectedId, sendRequest } =
    RequestToMeData();

  let modalComponent;
  if (sendRequest === "확인") {
    modalComponent = (
      <ConfirmContext isOpen={isModalOpen} closeModal={handleModalClose} selectedId={selectedId} />
    );
  } else if (sendRequest === "수정") {
    modalComponent = (
      <UpdateContext isOpen={isModalOpen} closeModal={handleModalClose} selectedId={selectedId} />
    );
  } else if (sendRequest === "조회") {
    modalComponent = (
      <CheckContext isOpen={isModalOpen} closeModal={handleModalClose} selectedId={selectedId} />
    );
  }

  useEffect(() => {
    axios({
      method: "get",
      url: "/requests/toMe/getCount",
    })
      .then((res) => {
        console.log(res.data);
        setRequestCount(res.data);
      })
      .catch((err) => {
        console.log("에러 발생 => " + err);
      });
  });

  return (
    <>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h4">결재 요청 내역</SoftTypography>
              <SoftTypography variant="h4">{requestCount}건</SoftTypography>
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

export default RequestToMe;
