import axios from "axios";
import CheckContext from "component_sy/modal/checkModal";
import RequestContext from "component_sy/modal/requestModal";
import UpdateContext from "component_sy/modal/updateModal";
import SoftTypography from "components/SoftTypography";
import { useEffect, useState } from "react";

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

  // const renderContext = (paymentId, sendRequest) => {
  //   switch (sendRequest) {
  //     case "신청":
  //       return <RequestContext paymentId={paymentId} />;
  //     case "수정":
  //       return <UpdateContext paymentId={paymentId} />;
  //     case "조회":
  //       return <CheckContext paymentId={paymentId} />;
  //     default:
  //       return null;
  //   }
  // };

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
      setSendRequest(payment.sendRequest);
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
          {payment.firstStepStatus}
        </SoftTypography>
      ),
      "2단계": (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {payment.secondStepStatus}
        </SoftTypography>
      ),
      신청: <button onClick={handleButtonClick}>{payment.sendRequest} </button>,
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
