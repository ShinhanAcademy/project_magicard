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

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import IssueSubForm from "../Invoice";
import Form from "react-bootstrap/Form";
import PurposeCategoryInputForm from "../PurposeCategoryInputForm";
import PurposeList from "../CategoryDisplay";
import { useState } from "react";
import PurposeModal from "component_sh/issueCards/Purpose/PurposeModal";
import { Button } from "react-bootstrap";

// Billing page components

function CateogryListMain() {
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };
  return (
    <Card id="delete-account" sx={{ height: "100%" }}>
      <SoftBox
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="flex-start"
        p={3}
      >
        <SoftTypography variant="h6" fontWeight="bold">
          용도 관리
        </SoftTypography>
        <SoftTypography variant="h6" fontWeight="light" color="secondary">
          기업의 지출 항목를 확인하고 추가, 수정, 삭제를 할 수 있습니다.
        </SoftTypography>
      </SoftBox>
      <SoftBox display="flex" alignItems="center" justifyContent="space-between" p={3}>
        <SoftTypography variant="h6" fontWeight="light" color="secondary">
          상위 항목
        </SoftTypography>
        <SoftButton onClick={showModal}> 추가하기 </SoftButton>
        {modalOpen && <PurposeModal setModalOpen={setModalOpen} />}
      </SoftBox>
      <PurposeList />
    </Card>
  );
}

export default CateogryListMain;
