/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import axios from "axios";
import SoftTypography from "components/SoftTypography";
import { useEffect, useState } from "react";

const RequestToMeData = () => {
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "/requests/toMe/getAllList",
    })
      .then((result) => {
        console.log(result.data);
        setRequestList(result.data);
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

  const rows = requestList.map((request) => {
    const paymentDate = request.paymentInfo.paymentTime.substr(0, 10);

    return {
      결제일시: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {paymentDate}
        </SoftTypography>
      ),
      요청자: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {request.employee.employeeName}
        </SoftTypography>
      ),
      권한자: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {request.responseEmployeeEmail}
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
        <SoftTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          {request.sendRequest}
        </SoftTypography>
      ),
    };
  });
  return { columns, rows };
};

export default RequestToMeData;
