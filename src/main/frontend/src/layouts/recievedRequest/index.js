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
      {isLoggedIn}
      <Link to="requesetToMe">
        <SoftButton ref={softButtonRef} style={{ width: "150px" }}>
          결재 요청 내역 관리
        </SoftButton>
      </Link>
      <Link to="finalRequestApprove">
        <SoftButton style={{ width: "150px" }}>승인</SoftButton>
      </Link>
      <Link to="finalRefuse">
        <SoftButton style={{ width: "150px" }}>반려</SoftButton>
      </Link>
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
