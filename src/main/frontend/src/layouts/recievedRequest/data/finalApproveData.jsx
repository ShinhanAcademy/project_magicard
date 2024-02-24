/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import axios from "axios";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import { useEffect, useState } from "react";

const FinalRequestApproveData = () => {
  const [approveList, setApproveList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [sendRequest, setSendRequest] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: "/requests/toMe/getApproveList",
    })
      .then((result) => {
        console.log(result.data);
        setApproveList(result.data);
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

  const rows = approveList.map((approve) => {
    const paymentDate = approve.paymentInfo.paymentTime.substr(0, 10);
    const paymentTimeArray = approve.paymentInfo.paymentTime.substr(11, 11).split("").slice(0, 5);
    const paymentTime = paymentDate + " " + paymentTimeArray.join("");
    const payAmount = approve.paymentInfo.payAmount.toLocaleString();

    const handleButtonClick = () => {
      setSendRequest(approve.sendRequest);
      handleModalOpen(approve.requestId);
    };

    let backgroundColor = "";
    let color = "";
    if (approve.sendRequest === "조회") {
      backgroundColor = "#ffffff";
      color = "#808080";
    } else if (approve.sendRequest === "수정") {
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
          {approve.requestEmployeeName}
        </SoftTypography>
      ),
      권한자: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {approve.responseEmployeeName}
        </SoftTypography>
      ),
      가맹점: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {approve.paymentInfo.merchant}
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
          {approve.purposeItem.purposeItem}
        </SoftTypography>
      ),
      상태: (
        <SoftTypography
          variant="caption"
          color="secondary"
          fontWeight="medium"
          style={{ color: "skyblue" }}
        >
          {approve.approvalSteps.approvalStep}
        </SoftTypography>
      ),
      승인요청: (
        <SoftButton
          onClick={handleButtonClick}
          style={{ backgroundColor: backgroundColor, color: color }}
        >
          {approve.sendRequest}
        </SoftButton>
      ),
    };
  });
  return { columns, rows, isModalOpen, handleModalOpen, handleModalClose, selectedId, sendRequest };
};

export default FinalRequestApproveData;
