import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import "layouts/payments/index.css";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import PaymentsInfo from "./display/paymentsInfo";
import RequestAll from "./display/requestAll";
import RequestApprove from "./display/requestApprove";
import Refuse from "./display/refuse";

import SoftButton from "components/SoftButton";
import { useAppDispatch } from "mk/store";
import { useSelector } from "react-redux";

function PaymentsTables() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector((state) => !!state.user.employeeName);

  // 현재 선택된 버튼을 추적하기 위한 상태 설정
  const [selectedButton, setSelectedButton] = useState(null);

  // 현재 URL 경로를 가져오기 위해 useLocation 훅 사용
  const location = useLocation();

  // 버튼 클릭 핸들러
  const handleButtonClick = (button) => {
    setSelectedButton(button === selectedButton ? null : button);
  };

  console.log(isLoggedIn);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {isLoggedIn}
      <Link to="paymentsInfo">
        <SoftButton style={{ width: "150px" }}>결제 내역</SoftButton>
      </Link>
      <Link to="requestAll">
        <SoftButton style={{ width: "150px" }}>승인 요청 전체</SoftButton>
      </Link>
      <Link to="requestApprove">
        <SoftButton style={{ width: "150px" }}>승인</SoftButton>
      </Link>
      <Link to="refuse">
        <SoftButton style={{ width: "150px" }}>반려</SoftButton>
      </Link>
      <Routes>
        <Route path="/paymentsInfo" element={<PaymentsInfo />}></Route>
        <Route path="/requestAll" element={<RequestAll />}></Route>
        <Route path="/requestApprove" element={<RequestApprove />}></Route>
        <Route path="/refuse" element={<Refuse />}></Route>
      </Routes>
    </DashboardLayout>
  );
}

export default PaymentsTables;
