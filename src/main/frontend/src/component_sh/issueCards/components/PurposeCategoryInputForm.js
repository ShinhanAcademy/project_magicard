/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PurposeList from "./CategoryDisplay";

function PurposeCategoryInputForm() {
  return (
    <>
      <SoftBox component="form" role="form">
        <h1> HI~</h1>
        <PurposeList></PurposeList>
      </SoftBox>
      {/* Modal 시작*/}
      <SoftBox component="form" role="form">
        <>
          <div>&nbsp;용도 카테고리</div>
          <SoftBox mb={2}>
            <SoftInput type="text" placeholder="자동차 관리비" />
          </SoftBox>

          <div>&nbsp;용도 세부</div>
          <SoftBox mb={2}>
            <SoftInput type="text" placeholder="보험료" />
          </SoftBox>

          <SoftBox mt={4} mb={1}>
            <SoftButton variant="gradient" color="dark" fullWidth>
              용도 추가
            </SoftButton>
          </SoftBox>
        </>
      </SoftBox>
      {/* Modal 시작*/}
    </>
  );
}

const submitPurposeCategory = () => {
  alert("안녕~");
};

export default PurposeCategoryInputForm;
