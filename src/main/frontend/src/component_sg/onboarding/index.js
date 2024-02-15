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
//import PaymentMethod from "layouts/billing/components/PaymentMethod";
//import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";
import OnboardingTransactions from "./components/Transactions";
import VideoBox from "component_sg/onboarding/components/VideoBox";
import CardDetail from "./components/CardDetail";

function Onboarding() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={4}>
        <SoftBox mb={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} xl={5}>
                  <MasterCard number={7777111145947852} holder="Seunggwang Roh" expires="11/22" />
                </Grid>
                <Grid item xs={12} md={6} xl={2.3}>
                  <DefaultInfoCard
                    icon="credit_score_rounded"
                    title="카드"
                    description="등록을 완료했습니다"
                    value="완료"
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={2.3}>
                  <DefaultInfoCard
                    icon="ondemand_video_rounded"
                    title="영상 시청"
                    description="교육을 완료했습니다"
                    value="완료"
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={2.3}>
                  <DefaultInfoCard
                    icon="fact_check_rounded"
                    title="서약서"
                    description="서명을 완료했습니다"
                    value="완료"
                  />
                </Grid>
                <Grid item xs={5}>
                  <CardDetail />
                </Grid>
                <Grid item xs={7}>
                  <VideoBox />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Onboarding;
