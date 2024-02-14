/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import axios from "axios";
import SoftTypography from "components/SoftTypography";
import { useEffect, useState } from "react";

const paymentInfoData = () => {
  const [paymentList, setPaymentList] = useState([]);

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

  const columns = [
    { name: "결제일시", align: "center" },
    { name: "사용처", align: "center" },
    { name: "사용금액", align: "center" },
    { name: "카드번호", align: "center" },
    { name: "상태", align: "center" },
    { name: "승인요청", align: "center" },
  ];

  const rows = paymentList.map((payment) => {
    const paymentDate = payment.paymentTime.substr(0, 10);

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
      상태: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {payment.requestStatus}
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
          {payment.sendRequest}
        </SoftTypography>
      ),
    };
  });
  return { columns, rows };
};

export default paymentInfoData;
