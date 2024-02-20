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
import { StylesConfig } from "react-select";
import "./CardIssueInputForm.css";

function CardIssueInputForm() {
  const [agreement, setAgremment] = useState(true);
  const [cardCodeSelect, setcardCodeSelect] = useState(null);
  const [rankSelect, setRankSelect] = useState(null);
  const [maxLimit, setMaxLimit] = useState(0);
  const [cardCount, setCardCount] = useState(0);
  const navi = useNavigate();
  const handleSetAgremment = () => setAgremment(!agreement);
  const rank = [
    { value: "임원", label: "임원" },
    { value: "부장", label: "부장" },
    { value: "대리", label: "대리" },
    { value: "사원", label: "사원" },
    { value: "인턴", label: "인턴" },
  ];

  const cardCode = [
    { value: "W", label: "The White" },
    { value: "G", label: "The DSGray" },
    { value: "B", label: "The Black" },
  ];

  const customStyles = {
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "#A9B1BE",
        fontSize: "medium",
        fontWeight: "regular",
      };
    },
    option: (provided, state) => ({
      ...provided,
      // border: "1px dotted black",
      // color: state.data.color,
      fontSize: "medium",
    }),
    control: (provided, state) => ({
      ...provided,
      paddingLeft: "5px",
      borderRadius: "10px",
      borderColor: state.isFocused ? "#35D1F5" : "#d2d6da",
      boxShadow: state.isFocused ? "0 0 0 2px #81E3F9" : "none",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      fontSize: "medium",
    }),
  };

  return (
    <SoftBox component="form" role="form">
      <SoftBox>
        <SoftTypography variant="h5">&nbsp;카드 선택</SoftTypography>
        <SoftBox mt={1} mb={5}>
          <Select
            styles={customStyles}
            placeholder="카드 타입을 선택해 주세요."
            options={cardCode}
            onChange={(e) => {
              setcardCodeSelect(e.value);
            }}
          />
        </SoftBox>
      </SoftBox>
      <SoftBox>
        <SoftTypography variant="h5">&nbsp;대상 직급</SoftTypography>
        <SoftBox mt={1} mb={5}>
          <Select
            styles={customStyles}
            sx={{ fontSize: "small" }}
            placeholder="카드를 사용할 직원의 직급을 선택해 주세요."
            options={rank}
            onChange={(e) => {
              setRankSelect(e.value);
            }}
          />
        </SoftBox>
      </SoftBox>
      <SoftBox>
        <SoftTypography variant="h5">&nbsp;월 최대 한도</SoftTypography>
        <SoftBox mt={1} mb={5}>
          <SoftInput
            className="input"
            type="number"
            placeholder="월 최대 사용 한도를 설정해 주세요."
            onChange={(e) => {
              setMaxLimit(e.target.value);
            }}
          />
        </SoftBox>
      </SoftBox>
      <SoftBox>
        <SoftTypography variant="h5">&nbsp;발급 수량</SoftTypography>
        <SoftBox mt={1} mb={5}>
          <SoftInput
            type="number"
            placeholder="발급 수량을 입력해주세요."
            onChange={(e) => {
              setCardCount(e.target.value);
            }}
          />
        </SoftBox>
      </SoftBox>
      <SoftBox display="flex" alignItems="center">
        <Checkbox checked={agreement} onChange={handleSetAgremment} />
        <SoftTypography
          variant="button"
          fontWeight="bold"
          onClick={handleSetAgremment}
          sx={{ cursor: "poiner", userSelect: "none" }}
        >
          &nbsp;&nbsp;마법 카드 이용 약관에 동의합니다
        </SoftTypography>
      </SoftBox>
      <SoftBox mt={4} mb={1}>
        <SoftButton
          variant="gradient"
          color="dark"
          fullWidth
          onClick={() => {
            submitCardIssueForm(cardCodeSelect, rankSelect, maxLimit, cardCount, agreement);
          }}
        >
          <SoftTypography variant="body1" color="white">
            발급 신청
          </SoftTypography>
        </SoftButton>
      </SoftBox>
    </SoftBox>
  );
}

const submitCardIssueForm = (cardCode, rank, maxLimit, cardCount, agreement) => {
  if (!agreement) {
    alert("약관에 동의해주십시오.");
    return;
  }

  if (cardCode == null) {
    alert("카드를 선택해주십시오.");
    return;
  }

  if (!rank) {
    alert("직급을 선택해주십시오.");
    return;
  }

  if (maxLimit <= 0) {
    alert("올바른 한도 금액을 입력 해 주십시오.");
    return;
  }

  if (maxLimit > 200000000) {
    alert("올바른 한도 금액을 입력 해 주십시오.");
    return;
  }

  if (cardCount <= 0) {
    alert("올바른 카드 수를 입력 해 주십시오.");
    return;
  }

  if (cardCount > 1000) {
    alert("올바른 카드 수를 입력 해 주십시오.");
    return;
  }

  axios
    .post("/issue-card", { cardCode, rank, maxLimit, cardCount })
    .then(function (response) {
      alert("신청 요청이 완료되었습니다.");
    })
    .catch(function (error) {
      alert("신청 요청 중 문제가 발생하였습니다. 관리자에게 문의해주세요.");
    })
    .finally(function () {
      //window.location.href = "/issue-cards";
      window.location.reload();
      //navi("/issue-cards");
    });
};

export default CardIssueInputForm;
