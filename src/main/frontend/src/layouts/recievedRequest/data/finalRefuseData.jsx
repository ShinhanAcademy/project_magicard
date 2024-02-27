/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import axios from "axios";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import { useEffect, useState } from "react";

const FinalRefuseData = () => {
  const [refuseList, setRefuseList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [sendRequest, setSendRequest] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: "/requests/toMe/getRefuseList",
    })
      .then((result) => {
        console.log(result.data);
        setRefuseList(result.data);
      })
      .catch((err) => {});
  }, []);

  const handleModalOpen = (selectedId) => {
    setSelectedId(selectedId);
    setIsModalOpen(true);
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

  const rows = refuseList.map((refuse) => {
    const paymentDate = refuse.paymentInfo.paymentTime.substr(0, 10);
    const paymentTimeArray = refuse.paymentInfo.paymentTime.substr(11, 11).split("").slice(0, 5);
    const paymentTime = paymentDate + " " + paymentTimeArray.join("");
    const payAmount = refuse.paymentInfo.payAmount.toLocaleString();

    const handleButtonClick = () => {
      setSendRequest(refuse.sendRequest);
      handleModalOpen(refuse.requestId);
    };

    let backgroundColor = "";
    let color = "";
    if (refuse.sendRequest === "조회") {
      backgroundColor = "#ffffff";
      color = "#808080";
    }

    let statusColor = "";
    if (refuse.approvalSteps.approvalStep === "최종 반려") {
      statusColor = "skyblue";
    } else {
      statusColor = "black";
    }

    return {
      결제일시: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {paymentTime}
        </SoftTypography>
      ),
      요청자: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {refuse.requestEmployeeName}
        </SoftTypography>
      ),
      권한자: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {refuse.responseEmployeeName}
        </SoftTypography>
      ),
      가맹점: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {refuse.paymentInfo.merchant}
        </SoftTypography>
      ),
      사용금액: (
        <SoftTypography
          variant="caption"
          color="secondary"
          fontWeight="medium"
          style={{ color: "red" }}
        >
          {payAmount}원
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
          {refuse.purposeItem.purposeItem}
        </SoftTypography>
      ),
      상태: (
        <SoftTypography
          variant="caption"
          color="secondary"
          fontWeight="medium"
          style={{ color: statusColor }}
        >
          {refuse.approvalSteps.approvalStep}
        </SoftTypography>
      ),
      승인요청: (
        <SoftButton
          onClick={handleButtonClick}
          style={{
            backgroundColor: backgroundColor,
            color: color,
          }}
        >
          {refuse.sendRequest}
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

export default FinalRefuseData;
