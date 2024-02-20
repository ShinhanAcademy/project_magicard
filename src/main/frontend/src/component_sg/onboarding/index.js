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
import ad from "assets/images/mk/ad.jpg";
import { Card } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

function Onboarding() {
  const isLoggedIn = useSelector((state) => !!state.user.employeeCode);
  const employeeEmail = useSelector((state) => state.user.employeeEmail);
  const employeeName = useSelector((state) => state.user.employeeName);
  const [card, setCard] = useState([]);
  let cardExpiredDate = "" + card.expireDate;

  const getMyCard = () => {
    if (isLoggedIn) {
      console.log(employeeEmail);
      axios
        .post("/my-card-info", { employeeEmail })
        .then((response) => {
          setCard(response.data);
          console.log("response.data: ", response.data);
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    getMyCard();
    console.log("Card[]: ", card);
  }, []);

  useEffect(() => {
    getMyCard();
    console.log("Card[isLoggedIn]: ", card);
  }, [isLoggedIn]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={4}>
        <SoftBox mb={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} xl={4.5}>
                  {isLoggedIn ? (
                    <MasterCard
                      cardType={card.cardName}
                      bgColor={card.cardCode}
                      number={card.cardNumber}
                      holder={employeeName}
                      expires={
                        cardExpiredDate.substring(5, 7) + "/" + cardExpiredDate.substring(2, 4)
                      }
                    />
                  ) : (
                    <MasterCard number={7777111145947852} holder="Seunggwang Roh" expires="11/22" />
                  )}
                </Grid>
                <Grid item xs={12} md={6} xl={2.5}>
                  <DefaultInfoCard
                    icon="credit_score_rounded"
                    title="카드"
                    description="등록을 완료했습니다"
                    value="완료"
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={2.5}>
                  <DefaultInfoCard
                    icon="ondemand_video_rounded"
                    title="영상 시청"
                    description="교육을 완료했습니다"
                    value="완료"
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={2.5}>
                  <DefaultInfoCard
                    icon="fact_check_rounded"
                    title="서약서"
                    description="서명을 완료했습니다"
                    value="완료"
                  />
                </Grid>
                <Grid item xs={5} container spacing={2}>
                  <Grid item xs={12}>
                    <CardDetail />
                  </Grid>
                  <Grid item xs={12}>
                    <Card id="ad-zone">
                      <SoftBox item xs={12}>
                        <img src={ad} alt="ad" style={{ width: "100%" }} />
                      </SoftBox>
                    </Card>
                  </Grid>
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
