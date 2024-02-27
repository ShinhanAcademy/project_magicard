import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import SoftBox from "components/SoftBox";
import { setLayout } from "mk/slices/softui";

function PageLayout({ background, children }) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const layout = useSelector((state) => state.layout.layout);

  useEffect(() => {
    dispatch(setLayout("page"));
  }, [pathname]);

  return (
    <SoftBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        p: 3,
        position: "relative",

        [breakpoints.up("xl")]: {
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      {children}
    </SoftBox>
  );
}

PageLayout.defaultProps = {
  background: "default",
};

PageLayout.propTypes = {
  background: PropTypes.oneOf(["white", "light", "default"]),
  children: PropTypes.node.isRequired,
};

export default PageLayout;
