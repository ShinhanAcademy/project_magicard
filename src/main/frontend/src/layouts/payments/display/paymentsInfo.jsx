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
  const [top5, setTop5] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "/paymentInfo/getTotalAmount",
    })
      .then((result) => {
        console.log(result.data);
        setTotalAmount(result.data.toLocaleString());
        // const payAmount = payment.payAmount;
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: "/paymentInfo/getTop5",
    })
      .then((result) => {
        console.log(result.data);
        setTop5(result.data);
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
            <SoftBox
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              alignItems="flex-start"
              p={3}
            >
              <SoftTypography variant="h4" fontWeight="bold">
                결제 내역 관리
              </SoftTypography>
              <SoftTypography variant="h6" fontWeight="light" color="secondary">
                직원의 결제 내역을 관리하고 승인을 요청, 수정, 확인할 수 있습니다.
              </SoftTypography>
              <br />
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
                <hr />
                <div className="this-month">
                  <SoftTypography variant="h5">
                    자주 가는 가맹점 <span>Top 5.</span>
                  </SoftTypography>
                  {top5.map((toptop, index) => (
                    <SoftTypography
                      variant="h6"
                      key={index}
                      style={{ color: index === 0 ? "red" : "black" }}
                    >
                      {toptop}
                    </SoftTypography>
                  ))}
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
