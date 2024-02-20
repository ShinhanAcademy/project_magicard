import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux"; // useDispatch 및 useSelector 추가
import SoftBox from "components/SoftBox";
import { setLayout } from "mk/slices/softui"; // softuiSlice에서 setLayout 가져오도록 변경
import { useLocation } from "react-router-dom";

function DashboardLayout({ children }) {
  const dispatch = useDispatch(); // useDispatch 훅을 사용하여 dispatch 함수 가져오기
  const { miniSidenav } = useSelector((state) => state.layout); // Redux store에서 miniSidenav 가져오기
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(setLayout("dashboard")); // setLayout 액션을 dispatch하여 layout 설정
  }, [dispatch, pathname]);

  return (
    <SoftBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        p: 3,
        position: "relative",

        [breakpoints.up("xl")]: {
          marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
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

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
