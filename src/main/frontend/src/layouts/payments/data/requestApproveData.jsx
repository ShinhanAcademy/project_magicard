import axios from "axios";
import SoftTypography from "components/SoftTypography";
import { useEffect, useState } from "react";

const RequestApproveData = () => {
  const [approveList, setApproveList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [sendRequest, setSendRequest] = useState(null);
  useEffect(() => {
    axios({
      method: "get",
      url: "/requests/fromMe/getApproveList",
    })
      .then((result) => {
        console.log(result.data);
        setApproveList(result.data);
      })
      .catch((err) => {});
  }, []);

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

  const handleModalOpen = (paymentId) => {
    setIsModalOpen(true);
    setSelectedPaymentId(paymentId);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  const rows = approveList.map((approve) => {
    const paymentDate = approve.paymentInfo.paymentTime.substr(0, 10);
    const handleButtonClick = () => {
      setSendRequest(approve.sendRequest);
      handleModalOpen(approve.paymentInfo.paymentId);
    };
    return {
      결제일시: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {paymentDate}
        </SoftTypography>
      ),
      요청자: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {approve.employee.employeeEmail}
        </SoftTypography>
      ),
      권한자: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {approve.responseEmployeeEmail}
        </SoftTypography>
      ),
      가맹점: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {approve.paymentInfo.merchant}
        </SoftTypography>
      ),
      사용금액: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {approve.paymentInfo.payAmount}
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
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {approve.approvalSteps.approvalStep}
        </SoftTypography>
      ),
      승인요청: <button onClick={handleButtonClick}>{approve.sendRequest}</button>,
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

export default RequestApproveData;
