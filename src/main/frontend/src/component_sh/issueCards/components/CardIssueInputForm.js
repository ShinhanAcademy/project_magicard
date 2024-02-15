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

  return (
    <SoftBox component="form" role="form">
      <div>&nbsp;카드 선택</div>
      <SoftBox mb={2}>
        <Select
          options={cardCode}
          onChange={(e) => {
            setcardCodeSelect(e.value);
          }}
        />
      </SoftBox>

      <div>&nbsp;대상 직급</div>
      <SoftBox mb={2}>
        <Select
          options={rank}
          onChange={(e) => {
            setRankSelect(e.value);
          }}
        />
      </SoftBox>

      <div>&nbsp;월 최대 한도</div>
      <SoftBox mb={2}>
        <SoftInput
          type="number"
          placeholder="월 최대 한도"
          onChange={(e) => {
            setMaxLimit(e.target.value);
          }}
        />
      </SoftBox>

      <div>&nbsp;발급 수량</div>
      <SoftBox mb={2}>
        <SoftInput
          type="number"
          placeholder="발급 수량"
          onChange={(e) => {
            setCardCount(e.target.value);
          }}
        />
      </SoftBox>

      <SoftBox display="flex" alignItems="center">
        <Checkbox checked={agreement} onChange={handleSetAgremment} />
        <SoftTypography
          variant="button"
          fontWeight="regular"
          onClick={handleSetAgremment}
          sx={{ cursor: "poiner", userSelect: "none" }}
        >
          &nbsp;&nbsp;마법 카드&nbsp;
        </SoftTypography>
        <SoftTypography
          component="b"
          href="/dashboard"
          variant="button"
          fontWeight="bold"
          textGradient
        >
          이용 약관에 동의합니다
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
          발급 신청
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
