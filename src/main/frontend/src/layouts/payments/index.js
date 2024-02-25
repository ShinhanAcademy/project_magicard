import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import "layouts/payments/index.css";
import { Link, Route, Routes } from "react-router-dom";
import PaymentsInfo from "./display/paymentsInfo";
import RequestApprove from "./display/requestApprove";
import Refuse from "./display/refuse";

import SoftButton from "components/SoftButton";
import { useSelector } from "react-redux";

function PaymentsTables() {
  const isLoggedIn = useSelector((state) => !!state.user.employeeName);
  const softButtonRef = useRef(null);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     softButtonRef.current.click();
  //   }
  // }, [isLoggedIn]);

  useEffect(() => {
    softButtonRef.current.click();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {isLoggedIn}
      <Link to="paymentsInfo">
        <SoftButton ref={softButtonRef} style={{ width: "150px" }}>
          결제 관리
        </SoftButton>
      </Link>
      <Link to="requestApprove">
        <SoftButton style={{ width: "150px" }}>승인</SoftButton>
      </Link>
      <Link to="refuse">
        <SoftButton style={{ width: "150px" }}>반려</SoftButton>
      </Link>
      <Routes>
        <Route path="/paymentsInfo" element={<PaymentsInfo />}></Route>
        <Route path="/requestApprove" element={<RequestApprove />}></Route>
        <Route path="/refuse" element={<Refuse />}></Route>
      </Routes>
    </DashboardLayout>
  );
}

export default PaymentsTables;
