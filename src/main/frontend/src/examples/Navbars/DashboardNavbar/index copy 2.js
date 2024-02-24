import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppBar, Toolbar, IconButton, Menu, Icon } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";
import { PropTypes } from "prop-types";
import { useLocation } from "react-router-dom";
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";
import { setTransparentNavbar } from "mk/slices/softui";
import axios from "axios";
import { setMiniSidenav } from "mk/slices/softui";
import { setOpenConfigurator } from "mk/slices/softui";
import userSlice from "mk/slices/user";
// import { setMiniSidenav, setOpenConfigurator, setTransparentNavbar } fro";

function DashboardNavbar({ absolute, light, isMini }) {
  const route = useLocation().pathname.split("/").slice(1);
  const dispatch = useDispatch();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = useSelector(
    (state) => state.layout
  );
  const [openMenu, setOpenMenu] = useState(false);
  const isLoggedIn = useSelector((state) => !!state.user.employeeCode);
  const loginName = useSelector((state) => state.user.employeeName);

  useEffect(() => {
    function handleTransparentNavbar() {
      dispatch(setTransparentNavbar((fixedNavbar && window.scrollY === 0) || !fixedNavbar));
    }

    window.addEventListener("scroll", handleTransparentNavbar);
    handleTransparentNavbar();

    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => dispatch(setMiniSidenav(!miniSidenav));
  const handleConfiguratorOpen = () => dispatch(setOpenConfigurator(!openConfigurator));
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  //   initializeUserInfo = async () => {
  //     const loggedInfo = storage.get('loggedInfo'); // 로그인 정보를 로컬스토리지에서 가져옵니다.
  //     if(!loggedInfo) return; // 로그인 정보가 없다면 여기서 멈춥니다.

  //     const { UserActions } = this.props;
  //     UserActions.setLoggedInfo(loggedInfo);
  //     try {
  //         await UserActions.checkStatus();
  //     } catch (e) {
  //         storage.remove('loggedInfo');
  //         window.location.href = '/auth/login?expired';
  //     }
  // }

  const login = () => {
    if (isLoggedIn) {
      // 로그인 -> 로그아웃
      axios
        .get("/auth/logout")
        .then((response) => {
          console.log(response.data);
          console.log("로그아웃");
        })
        .catch((error) => console.error(error));
      dispatch(userSlice.actions.reset());
      sessionStorage.clear();
    } else {
      // 로그아웃 -> 로그인
      axios
        .post("/auth/login")
        .then((response) => {
          console.log("로그인");
          console.log(response.data);
          // setIsLoggedIn(true);
          sessionStorage.setItem("loginMember", response.data);
          dispatch(
            userSlice.actions.setUser({
              employeeEmail: response.data.employeeEmail,
              employeeName: response.data.employeeName,
              phone: response.data.phone,
              employeeCode: response.data.employeeCode,
              employeeRank: response.data.employeeRank.rankName,
              department: response.data.department.departmentName,
              company: response.data.company.companyTicker,
            })
          );
        })
        .catch((error) => console.error(error));
    }
  };

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      {/* NotificationItem 내용 추가 */}
    </Menu>
  );

  return (
    <AppBar
      position={absolute ? "absolute" : fixedNavbar ? "sticky" : "static"}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </SoftBox>
        {isMini ? null : (
          <SoftBox sx={(theme) => navbarRow(theme, { isMini })}>
            <SoftBox pr={5}>
              <SoftInput
                placeholder="검색어를 입력하세요."
                icon={{ component: "search", direction: "left" }}
              />
            </SoftBox>
            <SoftBox color={light ? "white" : "inherit"}>
              <IconButton sx={navbarIconButton} onClick={login}>
                <Icon
                  sx={({ palette: { dark, white } }) => ({
                    color: light ? white.main : dark.main,
                  })}
                >
                  account_circle
                </Icon>
                {!isLoggedIn ? (
                  <SoftTypography
                    variant="button"
                    fontWeight="medium"
                    color={light ? "white" : "dark"}
                  >
                    Sign in
                  </SoftTypography>
                ) : (
                  <SoftTypography
                    style={isLoggedIn ? { maxWidth: "125px", minWidth: "125px" } : {}}
                    variant="button"
                    fontWeight="medium"
                  >
                    <SoftTypography variant="button" fontWeight="medium" color="info">
                      {loginName}
                    </SoftTypography>
                    님 환영합니다!
                  </SoftTypography>
                )}
              </IconButton>
              <IconButton
                size="small"
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon className={light ? "text-white" : "text-dark"}>
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon>settings</Icon>
              </IconButton>
              <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Icon className={light ? "text-white" : "text-dark"}>notifications</Icon>
              </IconButton>
              {renderMenu()}
            </SoftBox>
          </SoftBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

DashboardNavbar.propTypes = {
  absolute: PropTypes.bool, // absolute props에 대한 유효성 검사 추가
  light: PropTypes.bool, // light props에 대한 유효성 검사 추가
  isMini: PropTypes.bool, // isMini props에 대한 유효성 검사 추가
};

export default DashboardNavbar;
