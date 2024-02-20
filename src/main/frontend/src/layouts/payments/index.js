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

function PaymentsTables() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
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
