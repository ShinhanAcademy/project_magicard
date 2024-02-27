import axios from "axios";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import { useEffect, useState } from "react";

const FinalRequestAllData = () => {
  const [requestList, setRequestList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [sendRequest, setSendRequest] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: "/requests/toMe/getList",
    })
      .then((result) => {
        console.log(result.data);
        setRequestList(result.data);
      })
      .catch((err) => {});
  }, []);

  const handleModalOpen = (requestId) => {
    setIsModalOpen(true);
    setSelectedId(requestId);
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
    const payAmount = request.paymentInfo.payAmount.toLocaleString();

    const handleButtonClick = () => {
      setSendRequest(request.sendRequest);
      handleModalOpen(request.requestId);
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

    let statusColor = "";
    let status = request.approvalSteps.approvalStep;
    if (status === "승인" || status === "최종 승인") {
      statusColor = "#2697FF";
    } else if (status === "반려" || status === "최종 반려") {
      statusColor = "#E92222";
    } else {
      statusColor = "";
    }

    return {
      결제일시: (
        <SoftTypography variant="body3" color="dark" fontWeight="medium">
          {paymentTime}
        </SoftTypography>
      ),
      요청자: (
        <SoftTypography variant="body3" color="dark" fontWeight="bold">
          {request.requestEmployeeName}
        </SoftTypography>
      ),
      권한자: (
        <SoftTypography variant="body3" color="dark" fontWeight="bold">
          {request.responseEmployeeName}
        </SoftTypography>
      ),
      가맹점: (
        <SoftTypography variant="body3" color="dark" fontWeight="bold">
          {request.paymentInfo.merchant}
        </SoftTypography>
      ),
      사용금액: (
        <SoftTypography variant="body3" color="dark" fontWeight="bold" style={{ color: "red" }}>
          {payAmount}{" "}
          <SoftTypography variant="caption" color="#E92222" fontWeight="bold">
            원
          </SoftTypography>
        </SoftTypography>
      ),
      용도: (
        <SoftTypography component="a" href="#" variant="body3" color="dark" fontWeight="bold">
          {request.purposeItem.purposeItem}
        </SoftTypography>
      ),
      상태: (
        <SoftTypography
          variant="body3"
          color="dark"
          fontWeight="medium"
          style={{ color: statusColor }}
        >
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
    selectedId,
    sendRequest,
  };
};

export default FinalRequestAllData;
