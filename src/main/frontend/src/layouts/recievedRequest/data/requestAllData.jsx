import axios from "axios";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import { useEffect, useState } from "react";

const RequestAllData = () => {
  const [requestList, setRequestList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [sendRequest, setSendRequest] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: "/requests/toMe/getRequestList",
    })
      .then((result) => {
        console.log(result.data);
        setRequestList(result.data);
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
    { name: "요청자", align: "center" },
    { name: "권한자", align: "center" },
    { name: "가맹점", align: "center" },
    { name: "사용금액", align: "center" },
    { name: "용도", align: "center" },
    { name: "상태", align: "center" },
    { name: "승인요청", align: "center" },
  ];

  const rows = requestList.map((request) => {
    const paymentDate = request.paymentInfo.paymentTime.substr(0, 10);
    const paymentTimeArray = request.paymentInfo.paymentTime.substr(11, 11).split("").slice(0, 5);
    const paymentTime = paymentDate + " " + paymentTimeArray.join("");

    const handleButtonClick = () => {
      setSendRequest(request.sendRequest);
      handleModalOpen(request.paymentInfo.paymentId);
    };

    let backgroundColor = "";
    let color = "";
    if (request.sendRequest === "확인") {
      backgroundColor = "#2F4F4F";
      color = "#ffffff";
    } else if (request.sendRequest === "조회") {
      backgroundColor = "#ffffff";
      color = "#808080";
    } else if (request.sendRequest === "수정") {
      backgroundColor = "#cbe1d4";
      color = "#2f4f4f";
    }

    return {
      결제일시: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {paymentTime}
        </SoftTypography>
      ),
      요청자: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {request.requestEmployeeName}
        </SoftTypography>
      ),
      권한자: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {request.responseEmployeeName}
        </SoftTypography>
      ),
      가맹점: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {request.paymentInfo.merchant}
        </SoftTypography>
      ),
      사용금액: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {request.paymentInfo.payAmount}
        </SoftTypography>
      ),
      용도: (
        <SoftTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          {request.purposeItem.purposeItem}
        </SoftTypography>
      ),
      상태: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {request.approvalSteps.approvalStep}
        </SoftTypography>
      ),
      승인요청: (
        <SoftButton
          onClick={handleButtonClick}
          style={{ backgroundColor: backgroundColor, color: color }}
        >
          {request.sendRequest}
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

export default RequestAllData;
