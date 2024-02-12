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
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React components
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Billing page components
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";
import { useState } from "react";
import "assets/css/Modal_sg.css";
import IssueNewCardBtn from "./PaymentMethod";
import Button from "react-bootstrap/Button";
import black from "assets/images/sg/black.png";
import green from "assets/images/sg/green.png";
import white from "assets/images/sg/white.png";
import IssueForm from "./Invoices";
import CardIssueForm from "./CardIssueForm";
function IssueCards() {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center", // 이미지를 가로 방향으로 중앙에 정렬
      gap: "120px", // 이미지 간의 간격
    },
  };

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox mt={4}>
          <SoftBox mb={1.5}>
            <div style={styles.container}>
              <img src={black} alt="black" />
              <img src={green} alt="green" />
              <img src={white} alt="white" />
            </div>
            <div style={styles.container}>
              <Grid container spacing={3}>
                <Grid item xs={16} lg={16}>
                  <Grid container spacing={5}>
                    <Grid item xs={16}>
                      <IssueForm></IssueForm>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </SoftBox>
        </SoftBox>
        <Footer />
      </DashboardLayout>
    </>
  );
}

export default IssueCards;
