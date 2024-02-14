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

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";

function CardPlus({ color, size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>card-plus</title>
      <g id="Basic-Elements" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          id="CardPlus"
          transform="translate(-2169.000000, -745.000000)"
          fill={colors[color] ? colors[color].main : colors.dark.main}
          fillRule="nonzero"
        >
          <g id="Icons-with-opacity" transform="translate(1716.000000, 291.000000)">
            <g id="credit-card" transform="translate(453.000000, 454.000000)">
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

// Setting default values for the props of CreditCard
CardPlus.defaultProps = {
  color: "dark",
  size: "16px",
};

// Typechecking props for the CreditCard
CardPlus.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
    "white",
  ]),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default CardPlus;
