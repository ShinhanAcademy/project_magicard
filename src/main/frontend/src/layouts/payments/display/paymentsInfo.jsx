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

import ModalContext from "./requestModal";

function PaymentsInfo() {
  const { columns, rows, isModalOpen, handleModalOpen, handleModalClose, selectedPaymentId } =
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
      <ModalContext
        isOpen={isModalOpen}
        closeModal={handleModalClose}
        selectedPaymentId={selectedPaymentId}
      />
    </>
  );
}

export default PaymentsInfo;
