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

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import blackCard from "assets/images/mk/blackCard.png";
import blackCardBack from "assets/images/mk/blackCardBack.png";
import greenCard from "assets/images/mk/greenCard.png";
import greenCardBack from "assets/images/mk/greenCardBack.png";
import whiteCard from "assets/images/mk/whiteCard.png";
import whiteCardBack from "assets/images/mk/whiteCardBack.png";
import IssueForm from "./Invoices";
import "./index.css";
import SoftTypography from "components/SoftTypography";

function IssueCards() {
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox mt={10}>
          <SoftBox mb={5} className="flip-container">
            <SoftBox className="flip-outer">
              <SoftBox className="flip-inner">
                <img id="blackCard" src={blackCard} alt="blackCard" className="front" />
                <img id="blackCardBack" src={blackCardBack} alt="blackCardBack" className="back" />
              </SoftBox>
              <SoftTypography className="card-description">
                <SoftTypography className="card-name" variant="h5">
                  the Black
                </SoftTypography>
                <SoftTypography variant="h6">월 한도 제한 없음</SoftTypography>
                <SoftTypography variant="h6">연회비 1만원</SoftTypography>
              </SoftTypography>
            </SoftBox>
            <SoftBox className="flip-outer">
              <SoftBox className="flip-inner">
                <img id="greenCard" src={greenCard} alt="greenCard" className="front" />
                <img id="greenCardBack" src={greenCardBack} alt="greenCardBack" className="back" />
              </SoftBox>
              <SoftTypography className="card-description">
                <SoftTypography className="card-name" variant="h5">
                  the DSGray
                </SoftTypography>
                <SoftTypography variant="h6">월 한도 100만원 이하</SoftTypography>
                <SoftTypography variant="h6">연회비 1만원</SoftTypography>
              </SoftTypography>
            </SoftBox>
            <SoftBox className="flip-outer">
              <SoftBox className="flip-inner">
                <img id="whiteCard" src={whiteCard} alt="whiteCard" className="front" />
                <img id="whiteCardBack" src={whiteCardBack} alt="whiteCardBack" className="back" />
              </SoftBox>
              <SoftTypography className="card-description">
                <SoftTypography className="card-name" variant="h5">
                  the White
                </SoftTypography>
                <SoftTypography variant="h6">월 한도 50만원 이하</SoftTypography>
                <SoftTypography variant="h6">연회비 1만원</SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox>
            <Grid
              container
              spacing={3}
              mt={3}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Grid item xs={9}>
                <IssueForm></IssueForm>
              </Grid>
            </Grid>
          </SoftBox>
        </SoftBox>
        <Footer />
      </DashboardLayout>
    </>
  );
}

export default IssueCards;
