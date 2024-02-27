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
// import Carousel from "react-bootstrap/Carousel";
import { Carousel } from "react-bootstrap";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
import { useState } from "react";

function IssueCards() {
  const [show, setShow] = useState(true);

  const handleShow = () => {
    setShow(false);
  };
  const returnShow = () => {
    setShow(true);
  };

  const [showRecommendation, setShowRecommendation] = useState(false);

  const handleToggleRecommendation = () => {
    setShowRecommendation(!showRecommendation);
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox mt={10}>
          <Slider {...settings} className="slider">
            <div>
              <div className="recommend">추천 카드 -&gt;</div>
              <SoftBox mb={5} className="flip-container">
                <SoftBox className="flip-outer">
                  <SoftBox className="flip-inner">
                    <img id="blackCard" src={blackCard} alt="blackCard" className="front" />
                    <img
                      id="blackCardBack"
                      src={blackCardBack}
                      alt="blackCardBack"
                      className="back"
                    />
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
                    <img
                      id="greenCardBack"
                      src={greenCardBack}
                      alt="greenCardBack"
                      className="back"
                    />
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
                    <img
                      id="whiteCardBack"
                      src={whiteCardBack}
                      alt="whiteCardBack"
                      className="back"
                    />
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
            </div>
            <div>
              <SoftBox className="recommend-card">
                <div className="sol-travel-card">
                  <div className="sol-card-images">
                    <div className="sol-card-sero plane">
                      <a href="https://www.shinhancard.com/pconts/html/card/apply/check/1225714_2206.html">
                        <img
                          id="whiteCard"
                          src="https://www.shinhancard.com/pconts/images/contents/card/plate/cdCheckBUBDGO.gif"
                          alt="비행기 카드"
                        />
                      </a>
                    </div>
                    <div className="sol-card-sero street">
                      <a href="https://www.shinhancard.com/pconts/html/card/apply/check/1225714_2206.html">
                        <img
                          id="whiteCard"
                          src="https://www.shinhancard.com/pconts/images/contents/card/plate/cdCheckBUBDGP.gif"
                          alt="도로 카드"
                        />
                      </a>
                    </div>
                    {/* <div className="sol-card-garo dora">
                      <a href="https://www.shinhancard.com/pconts/html/card/apply/check/1225714_2206.html">
                        <img
                          id="whiteCard"
                          src="https://www.shinhancard.com/pconts/images/contents/card/plate/cdCheckBUBDGQ.gif"
                          alt="도라에몽 카드"
                        />
                      </a>
                    </div> */}
                    <div className="sol-card-sero shin">
                      <a href="https://www.shinhancard.com/pconts/html/card/apply/check/1225714_2206.html">
                        <img
                          id="whiteCard"
                          src="https://www.shinhancard.com/pconts/images/contents/card/plate/cdCheckBUBDGR.gif"
                          alt="짱구 카드"
                        />
                      </a>
                    </div>
                  </div>
                  <div>
                    <SoftTypography className="card-name" variant="h4">
                      신한카드 SOL트래블 체크
                    </SoftTypography>
                    <SoftTypography variant="h6">해외여행은 SOL트래블로!</SoftTypography>
                    <SoftTypography variant="h6" mb={1}>
                      연회비 1만원
                    </SoftTypography>
                    <SoftBox
                      className="sol-benefit"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src="https://www.shinhancard.com/pconts/images/contents/card/ico_card_benefit_m_14.png"></img>
                      <span className="benefit-text">해외 이용 수수료 면제</span>
                    </SoftBox>
                    <SoftBox
                      className="sol-benefit"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src="https://www.shinhancard.com/pconts/images/contents/card/ico_card_benefit_m_16.png"></img>
                      <span className="benefit-text">더라운지 본인 무료 입장</span>
                    </SoftBox>
                    <SoftBox
                      className="sol-benefit"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src="https://www.shinhancard.com/pconts/images/contents/card/ico_card_benefit_m_18.png"></img>
                      <span className="benefit-text">해외 대중교통 1% 결제일 할인</span>
                    </SoftBox>
                  </div>
                </div>
              </SoftBox>
            </div>
          </Slider>
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
