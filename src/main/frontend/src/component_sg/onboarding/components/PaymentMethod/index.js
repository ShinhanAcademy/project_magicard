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
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React base styles
import borders from "assets/theme/base/borders";

// Images
import masterCardLogo from "assets/images/logos/mastercard.png";
import visaLogo from "assets/images/logos/visa.png";
import pen from "assets/images/logos/pen.png";
import document from "assets/images/logos/document.png";
function CardDetail() {
  const { borderWidth, borderColor } = borders;

  return (
    <Card id="delete-account">
      <SoftBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <SoftTypography variant="h6" fontWeight="medium">
          법인 카드 사용 서약서
        </SoftTypography>
        <SoftButton variant="gradient" color="dark">
          <Icon sx={{ fontWeight: "bold" }}>check</Icon>
          &nbsp;서류 확인
        </SoftButton>
      </SoftBox>
      <SoftBox p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <SoftBox
              border={`${borderWidth[1]} solid ${borderColor}`}
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
            >
              <SoftBox component="img" src={document} alt="master card" width="10%" mr={2} />
              <SoftTypography variant="h6" fontWeight="medium">
                법인 카드 사용 안내 (마법카드)
                {/* ****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;7852 */}
              </SoftTypography>
              <SoftBox ml="auto" lineHeight={0}>
                <Tooltip title="상세 보기" placement="top">
                  <Icon sx={{ cursor: "pointer" }} fontSize="small">
                    edit
                  </Icon>
                </Tooltip>
              </SoftBox>
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <SoftBox
              border={`${borderWidth[1]} solid ${borderColor}`}
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
            >
              <SoftBox component="img" src={document} alt="master card" width="10%" mr={2} />
              <SoftTypography variant="h6" fontWeight="medium">
                법인 카드 사용 서약서
                {/* ****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;5248 */}
              </SoftTypography>
              <SoftBox ml="auto" lineHeight={0}>
                <Tooltip title="상세 보기" placement="top">
                  <Icon sx={{ cursor: "pointer" }} fontSize="small">
                    edit
                  </Icon>
                </Tooltip>
              </SoftBox>
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
    </Card>
  );
}

export default CardDetail;
