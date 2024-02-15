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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import { Card } from "@mui/material";

function VideoBox({ date, id, price, noGutter }) {
  return (
    <Card sx={{ height: "100%", minHeight: "500px" }}>
      <SoftBox
        component="li"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        py={1}
        pr={1}
        mb={noGutter ? 0 : 1}
      >
        <iframe
          width="auto"
          height="auto"
          src="https://www.youtube.com/embed/W8s_Smx4v_U?si=x15S8jNsrX-FJwEB"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>

        <p
          style={{
            fontFamily: "Chungbuk National University Regular",
            fontSize: "16px",
            textAlign: "left",
          }}
        >
          <SoftTypography variant="h6" fontWeight="medium">
            법인 카드 사용 전 교육 영상을 필히 시청하시기 바랍니다. <br />
            카드 사용에 대한 지침, 보안 조치,리워드 프로그램 등<br />
            주요 약관 사항에 대한 다양한 정보를 포함하고 있습니다. <br />
            이는 당사의 서비스를 안전하게 이용하고,카드를 효과적으로 <br />
            활용사실 수 있도록 도움을 드리고자 함입니다.
          </SoftTypography>
        </p>
      </SoftBox>
    </Card>
  );
}

// Setting default values for the props of Invoice
VideoBox.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Invoice
VideoBox.propTypes = {
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default VideoBox;
