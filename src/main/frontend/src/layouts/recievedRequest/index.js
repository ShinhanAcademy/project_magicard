import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { Link, Route, Routes, useLocation } from "react-router-dom";
import RequestToMeData from "./data/requestToMeData";
import RequestToMe from "./display/requestToMe";
import RequestApprove from "./display/requestApprove";
import Refuse from "./display/refuse";
import "layouts/recievedRequest/index.css";

import SoftButton from "components/SoftButton";

function RecievedRequest() {
  const [selectedButton, setSelectedButton] = useState(null);

  const location = useLocation();

  const handleButtonClick = (button) => {
    setSelectedButton(button === selectedButton ? null : button);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Link to="requesetToMe">
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
        <Route path="/requestApprove" element={<RequestApprove />}></Route>
        <Route path="/refuse" element={<Refuse />}></Route>
      </Routes>
    </DashboardLayout>
  );
}

export default RecievedRequest;
