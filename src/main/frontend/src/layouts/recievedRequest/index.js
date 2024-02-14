import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { Link, Route, Routes, useLocation } from "react-router-dom";
import RequestToMeData from "./data/requestToMeData";
import RequestToMe from "./display/requestToMe";
import RequestApprove from "./display/requestApprove";
import Refuse from "./display/refuse";
import "layouts/recievedRequest/index.css";

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
        <button
          className={selectedButton === "requestToMe" ? "selected" : ""}
          onClick={() => handleButtonClick("requestToMe")}
        >
          전체
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
        <Route path="/" element={<RequestToMe />}></Route>
        <Route path="/requesetToMe" element={<RequestToMe />}></Route>
        <Route path="/requestApprove" element={<RequestApprove />}></Route>
        <Route path="/refuse" element={<Refuse />}></Route>
      </Routes>
    </DashboardLayout>
  );
}

export default RecievedRequest;
