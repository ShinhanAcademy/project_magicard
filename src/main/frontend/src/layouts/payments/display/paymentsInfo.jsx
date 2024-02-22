import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

import Card from "@mui/material/Card";

import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

import paymentInfoData from "layouts/payments/data/paymentsInfoData";
import usingMoney from "assets/images/payment-images/usingMoney.png";
import leftMoney from "assets/images/payment-images/leftMoney.png";
import "layouts/payments/display/paymentsInfo.css";
import axios from "axios";
import { useEffect, useState } from "react";
import RequestContext from "component_sy/modal/requestModal";
import UpdateContext from "component_sy/modal/updateModal";
import CheckContext from "component_sy/modal/checkModal";

function PaymentsInfo() {
  const { columns, rows, isModalOpen, handleModalOpen, handleModalClose, selectedId, sendRequest } =
    paymentInfoData();

  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    axios({
      method: "get",
      url: "/paymentInfo/getTotalAmount",
    })
      .then((result) => {
        console.log(result.data);
        setTotalAmount(result.data);
      })
      .catch((err) => {});
  }, []);

  let modalComponent;
  if (sendRequest === "신청") {
    modalComponent = (
      <RequestContext isOpen={isModalOpen} closeModal={handleModalClose} selectedId={selectedId} />
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

  return (
    <>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <div className="money-container">
                <div className="this-month">
                  <img src={usingMoney} />
                  <h4>이번 달 결제 금액</h4>
                  <SoftTypography variant="h6">{totalAmount}원</SoftTypography>
                </div>
                <hr />
                <div className="this-month">
                  <img src={leftMoney} />
                  <h4>이번 달 잔액</h4>
                  <SoftTypography variant="h6">25,000원</SoftTypography>
                </div>
              </div>
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

export default PaymentsInfo;
