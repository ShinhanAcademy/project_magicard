import axios from "axios";
import SoftTypography from "components/SoftTypography";
import { useCallback, useEffect, useState } from "react";
import "./paymentsInfoData.css";
import SoftButton from "components/SoftButton";

const paymentInfoData = () => {
  const [paymentList, setPaymentList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [sendRequest, setSendRequest] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: "/paymentInfo/getList",
    })
      .then((result) => {
        console.log(result.data);
        setPaymentList(result.data);
      })
      .catch((err) => {});
  }, []);

  const handleModalOpen = (paymentId) => {
    setIsModalOpen(true);
    setSelectedPaymentId(paymentId);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  const columns = [
    { name: "결제일시", align: "center" },
    { name: "사용처", align: "center" },
    { name: "사용금액", align: "center" },
    { name: "카드번호", align: "center" },
    { name: "1단계", align: "center" },
    { name: "2단계", align: "center" },
    { name: "신청", align: "center" },
  ];

  const rows = paymentList.map((payment) => {
    const paymentDate = payment.paymentTime.substr(0, 10);
    const paymentTimeArray = payment.paymentTime.substr(11, 11).split("").slice(0, 5);
    const paymentTime = paymentDate + " " + paymentTimeArray.join("");

    const handleButtonClick = () => {
      setSendRequest(payment.sendRequest);
      handleModalOpen(payment.paymentId);
    };

    let backgroundColor = "";
    let color = "";
    if (payment.sendRequest === "신청") {
      backgroundColor = "#2F4F4F";
      color = "#ffffff";
    } else if (payment.sendRequest === "조회") {
      backgroundColor = "#ffffff";
      color = "#808080";
    } else if (payment.sendRequest === "수정") {
      backgroundColor = "#cbe1d4";
      color = "#2f4f4f";
    }

    return {
      결제일시: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {paymentTime}
        </SoftTypography>
      ),
      사용처: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {payment.merchant}
        </SoftTypography>
      ),
      사용금액: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {payment.payAmount}
        </SoftTypography>
      ),
      카드번호: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {payment.issuedCard.cardNumber}
        </SoftTypography>
      ),
      "1단계": (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {payment.firstStepStatus}
        </SoftTypography>
      ),
      "2단계": (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {payment.secondStepStatus}
        </SoftTypography>
      ),
      신청: (
        <SoftButton
          onClick={handleButtonClick}
          style={{
            backgroundColor: backgroundColor,
            color: color,
          }}
        >
          {payment.sendRequest}{" "}
        </SoftButton>
      ),
    };
  });
  return {
    columns,
    rows,
    isModalOpen,
    handleModalOpen,
    handleModalClose,
    selectedPaymentId,
    sendRequest,
  };
};

export default paymentInfoData;
