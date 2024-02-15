import PropTypes from "prop-types";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";

function Check({ color, size }) {
  return (
    <>
      <svg width={size} height={size} viewBox="0 0 576 512">
        <title>check</title>
        <g id="Basic-Elements" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g
            id="Rounded-Icons"
            transform="translate(-1869.000000, -741.000000)"
            fill={colors[color] ? colors[color].main : colors.dark.main}
            fillRule="nonzero"
          >
            <g id="Icons-with-opacity" transform="translate(1716.000000, 291.000000)">
              <g id="basket" transform="translate(153.000000, 450.000000)">
                <path
                  className="color-background"
                  d="M96 80c0-26.5 21.5-48 48-48H432c26.5 0 48 21.5 48 48V384H96V80zm313 47c-9.4-9.4-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L409 161c9.4-9.4 9.4-24.6 0-33.9zM0 336c0-26.5 21.5-48 48-48H64V416H512V288h16c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V336z"
                  // opacity="0.595377604"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </>
  );
}

// Setting default values for the props of Basket
Check.defaultProps = {
  color: "dark",
  size: "16px",
};

// Typechecking props for the Basket
Check.propTypes = {
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

export default Check;
