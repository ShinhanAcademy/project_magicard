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
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

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
      <SoftBox style={{ display: "flex" }}>
        <SoftBox mr={1}>
          <Link to="paymentsInfo">
            <SoftButton ref={softButtonRef} style={{ width: "150px" }}>
              <SoftTypography variant="h6" color="dark" fontWeight="bold">
                결제 관리
              </SoftTypography>
            </SoftButton>
          </Link>
        </SoftBox>
        <SoftBox mr={1}>
          <Link to="requestApprove">
            <SoftButton style={{ width: "150px" }}>
              <SoftTypography variant="h6" color="dark" fontWeight="bold">
                승인
              </SoftTypography>
            </SoftButton>
          </Link>
        </SoftBox>
        <SoftBox mr={1}>
          <Link to="refuse">
            <SoftButton style={{ width: "150px" }}>
              <SoftTypography variant="h6" color="dark" fontWeight="bold">
                반려
              </SoftTypography>
            </SoftButton>
          </Link>
        </SoftBox>
      </SoftBox>

      <Routes>
        <Route path="/paymentsInfo" element={<PaymentsInfo />}></Route>
        <Route path="/requestApprove" element={<RequestApprove />}></Route>
        <Route path="/refuse" element={<Refuse />}></Route>
      </Routes>
    </DashboardLayout>
  );
}

export default PaymentsTables;
