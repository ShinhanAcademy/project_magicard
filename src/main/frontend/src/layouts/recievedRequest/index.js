import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { Link, Route, Routes } from "react-router-dom";
import RequestToMe from "./display/requestToMe";
import RequestAll from "./display/requestAll";
import RequestApprove from "./display/requestApprove";
import Refuse from "./display/refuse";
import "layouts/recievedRequest/index.css";

import SoftButton from "components/SoftButton";

function RecievedRequest() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Link to="requesetToMe">
        <SoftButton style={{ width: "150px" }}>결재 요청 내역</SoftButton>
      </Link>
      <Link to="requestAll">
        <SoftButton style={{ width: "150px" }}>전체</SoftButton>
      </Link>
      <Link to="requestApprove">
        <SoftButton style={{ width: "150px" }}>승인</SoftButton>
      </Link>
      <Link to="refuse">
        <SoftButton style={{ width: "150px" }}>반려</SoftButton>
      </Link>
      <Routes>
        <Route path="/" element={<RequestToMe />}></Route>
        <Route path="/requesetToMe" element={<RequestToMe />}></Route>
        <Route path="/requestAll" element={<RequestAll />}></Route>
        <Route path="/requestApprove" element={<RequestApprove />}></Route>
        <Route path="/refuse" element={<Refuse />}></Route>
      </Routes>
    </DashboardLayout>
  );
}

export default RecievedRequest;
