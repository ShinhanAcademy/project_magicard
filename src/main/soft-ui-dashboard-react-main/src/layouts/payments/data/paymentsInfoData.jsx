/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import { Modal } from "@mui/material";
import axios from "axios";
import SoftTypography from "components/SoftTypography";
import { useEffect, useState } from "react";

const paymentInfoData = () => {
  const [paymentList, setPaymentList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);

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
    // 모달을 열기 위한 로직
    setIsModalOpen(true);
    // 추가적인 로직 수행 가능
    setSelectedPaymentId(paymentId);
  };

  const handleModalClose = () => {
    // 모달을 닫기 위한 로직
    setIsModalOpen(false);
    // 추가적인 로직 수행 가능
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
    const handleButtonClick = () => {
      handleModalOpen(payment.paymentId);
    };

    return {
      결제일시: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {paymentDate}
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
          {payment.requestStatus}
        </SoftTypography>
      ),
      "2단계": (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {payment.requestStatus}
        </SoftTypography>
      ),
      신청: <button onClick={handleButtonClick}>{payment.sendRequest}</button>,
    };
  });
  return { columns, rows, isModalOpen, handleModalOpen, handleModalClose, selectedPaymentId };
};

export default paymentInfoData;
