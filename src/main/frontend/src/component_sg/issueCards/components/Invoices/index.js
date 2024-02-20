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
import CardIssueInputForm from "../CardIssueInputForm";
// Billing page components

function IssueForm() {
  return (
    <Card id="delete-account" sx={{ height: "100%" }}>
      <SoftBox px={10} py={8}>
        <CardIssueInputForm />
      </SoftBox>
    </Card>
  );
}

export default IssueForm;
