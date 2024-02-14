import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import "layouts/payments/index.css";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import PaymentsInfo from "./display/paymentsInfo";
import RequestAll from "./display/requestAll";
import RequestApprove from "./display/requestApprove";
import Refuse from "./display/refuse";

function PaymentsTables() {
  // 현재 선택된 버튼을 추적하기 위한 상태 설정
  const [selectedButton, setSelectedButton] = useState(null);

  // 현재 URL 경로를 가져오기 위해 useLocation 훅 사용
  const location = useLocation();

  // 버튼 클릭 핸들러
  const handleButtonClick = (button) => {
    setSelectedButton(button === selectedButton ? null : button);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Link to="paymentsInfo">
        <button
          className={selectedButton === "paymentsInfo" ? "selected" : ""}
          onClick={() => handleButtonClick("paymentsInfo")}
        >
          결제 내역
        </button>
      </Link>
      <Link to="requestAll">
        <button
          className={selectedButton === "requestAll" ? "selected" : ""}
          onClick={() => handleButtonClick("requestAll")}
        >
          승인 요청 전체
        </button>
      </Link>
      <Link to="requestApprove">
        <button
          className={selectedButton === "requestApprove" ? "selected" : ""}
          onClick={() => handleButtonClick("requestApprove")}
        >
          승인
        </button>
      </Link>
      <Link to="refuse">
        <button
          className={selectedButton === "refuse" ? "selected" : ""}
          onClick={() => handleButtonClick("refuse")}
        >
          반려
        </button>
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
