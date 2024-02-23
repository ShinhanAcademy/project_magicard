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
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Images
import green from "assets/images/mk/green.png";
import magicardLogo from "assets/images/mk/magicardLogo.png";
import magicardLogoBlack from "assets/images/mk/magicardLogoBlack.png";
import { Height } from "@mui/icons-material";

function MasterCard({ cardType, bgColor, color, number, holder, expires }) {
  const numbers = [...`${number}`];

  // if (numbers.length < 16 || numbers.length > 16) {
  //   throw new Error(
  //     "Invalid value for the prop number, the value for the number prop shouldn't be greater than or less than 16 digits"
  //   );
  // }

  const num1 = numbers.slice(0, 4).join("");
  const num2 = numbers.slice(4, 8).join("");
  const num3 = numbers.slice(8, 12).join("");
  const num4 = numbers.slice(12, 16).join("");

  let backgroundColor = "";
  if (bgColor == "W") {
    backgroundColor = "#fffff";
  } else if (bgColor == "G") {
    backgroundColor = "#2F4F4F";
  } else {
    backgroundColor = "#000001";
  }

  return (
    <Card
      sx={({
        palette: { gradients },
        functions: { linearGradient, rgba },
        boxShadows: { xl },
      }) => ({
        background: gradients[color]
          ? `${linearGradient(
              rgba(gradients[color].main, 0.35),
              rgba(gradients[color].state, 0.1)
              // )}, url(${green})`
            )}`
          : `${linearGradient(
              rgba(gradients.dark.main, 0.8),
              rgba(gradients.dark.state, 0.8)
              // )}, url(${green})`,
            )}`,
        backgroundColor: { backgroundColor },
        boxShadow: xl,
      })}
    >
      <SoftBox p={3} pb={4} pt={4}>
        <SoftBox color="white" p={1} lineHeight={0} display="inline-block">
          <SoftTypography
            variant="h6"
            color={bgColor == "W" ? "black" : "white"}
            fontWeight="medium"
          >
            {cardType}
          </SoftTypography>
        </SoftBox>
        <SoftTypography
          variant="h5"
          color={bgColor == "W" ? "black" : "white"}
          fontWeight="medium"
          sx={{ mt: 3, mb: 5, pb: 1 }}
        >
          {num1}&nbsp;&nbsp;&nbsp;{num2}&nbsp;&nbsp;&nbsp;{num3}&nbsp;&nbsp;&nbsp;{num4}
        </SoftTypography>
        <SoftBox display="flex" justifyContent="space-between" alignItems="center">
          <SoftBox display="flex" alignItems="center">
            <SoftBox mr={3} lineHeight={1}>
              <SoftTypography
                variant="button"
                color={bgColor == "W" ? "black" : "white"}
                fontWeight="regular"
                opacity={0.8}
              >
                Card Holder
              </SoftTypography>
              <SoftTypography
                variant="h6"
                color={bgColor == "W" ? "black" : "white"}
                fontWeight="medium"
                textTransform="capitalize"
              >
                {holder}
              </SoftTypography>
            </SoftBox>
            <SoftBox lineHeight={1}>
              <SoftTypography
                variant="button"
                color={bgColor == "W" ? "black" : "white"}
                fontWeight="regular"
                opacity={0.8}
              >
                Expires
              </SoftTypography>
              <SoftTypography
                variant="h6"
                color={bgColor == "W" ? "black" : "white"}
                fontWeight="medium"
              >
                {expires}
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox display="flex" justifyContent="flex-end" width="20%">
            <SoftBox
              component="img"
              src={bgColor == "W" ? magicardLogoBlack : magicardLogo}
              alt="master card"
              width="100%"
              mt={1}
            />
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

// Setting default values for the props of MasterCard
MasterCard.defaultProps = {
  color: "dark",
};

// Typechecking props for the MasterCard
MasterCard.propTypes = {
  cardType: PropTypes.string.isRequired,
  bgColor: PropTypes.oneOf(["B", "D", "W"]),
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  number: PropTypes.number.isRequired,
  holder: PropTypes.string.isRequired,
  expires: PropTypes.string.isRequired,
};

export default MasterCard;
