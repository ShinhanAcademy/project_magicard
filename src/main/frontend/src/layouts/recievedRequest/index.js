import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { Link, Route, Routes } from "react-router-dom";
import "layouts/recievedRequest/index.css";

import SoftButton from "components/SoftButton";
import { useSelector } from "react-redux";
import FinalRefuse from "./display/finalRefuse";
import FinalRequestApprove from "./display/finalApprove";
import FinalRequestAll from "./display/finalrequestAll";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function RecievedRequest() {
  const isLoggedIn = useSelector((state) => !!state.user.employeeCode);
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
          <Link to="requesetToMe">
            <SoftButton ref={softButtonRef} style={{ width: "170px" }}>
              <SoftTypography variant="h6" color="dark" fontWeight="bold">
                결재 요청 내역 관리
              </SoftTypography>
            </SoftButton>
          </Link>
        </SoftBox>
        <SoftBox mr={1}>
          <Link to="finalRequestApprove">
            <SoftButton style={{ width: "150px" }}>
              <SoftTypography variant="h6" color="dark" fontWeight="bold">
                승인
              </SoftTypography>
            </SoftButton>
          </Link>
        </SoftBox>
        <SoftBox mr={1}>
          <Link to="finalRefuse">
            <SoftButton style={{ width: "150px" }}>
              <SoftTypography variant="h6" color="dark" fontWeight="bold">
                반려
              </SoftTypography>
            </SoftButton>
          </Link>
        </SoftBox>
      </SoftBox>
      <Routes>
        <Route path="/" element={<FinalRequestAll />}></Route>
        <Route path="/requesetToMe" element={<FinalRequestAll />}></Route>
        <Route path="/finalRequestApprove" element={<FinalRequestApprove />}></Route>
        <Route path="/finalRefuse" element={<FinalRefuse />}></Route>
      </Routes>
    </DashboardLayout>
  );
}

export default RecievedRequest;
