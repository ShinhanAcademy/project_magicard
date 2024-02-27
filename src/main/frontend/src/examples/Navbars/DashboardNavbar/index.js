import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppBar, Toolbar, IconButton, Menu, Icon } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";
import { PropTypes } from "prop-types";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
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
import { persistor } from "mk/store";
// import { setMiniSidenav, setOpenConfigurator, setTransparentNavbar } fro";

function DashboardNavbar({ absolute, light, isMini }) {
  const route = useLocation().pathname.split("/").slice(1);
  const dispatch = useDispatch();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = useSelector(
    (state) => state.layout
  );
  const [openMenu, setOpenMenu] = useState(false);
  const user = useSelector((state) => state.user);
  const isLoggedIn = useSelector((state) => !!state.user.employeeCode);
  const loginName = useSelector((state) => state.user.employeeName);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const navigate = useNavigate();

  console.log("유저유저", user);
  console.log("route", route);

  console.log("transparentNavbar", transparentNavbar);
  console.log("fixedNavbar", fixedNavbar);

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

  const login = async (isAdmin) => {
    console.log("login f", isAdmin);
    if (isLoggedIn) {
      // 로그인 -> 로그아웃
      axios
        .get("/auth/logout")
        .then((response) => {
          console.log(response.data);
          console.log("로그아웃");
        })
        .catch((error) => console.error(error));
      persistor.purge();
      dispatch(userSlice.actions.reset());
      sessionStorage.clear();
    } else {
      // 로그아웃 -> 로그인
      var url = "/auth/login";
      if (isAdmin) {
        url = "/auth/adminLogin";
        console.log("url", isAdmin);
      }
      axios
        .post(url)
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
              isAdmin: response.data.department.adminDepartment,
            })
          );
        })
        .catch((error) => console.error(error));
    }
    if (isAdmin) {
      navigate("/dashboard");
    } else {
      navigate("/payments/*");
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
            {/* <SoftBox pr={5}>
              <SoftInput
                placeholder="검색어를 입력하세요."
                icon={{ component: "search", direction: "left" }}
              />
            </SoftBox> */}
            <SoftBox color={light ? "white" : "inherit"}>
              {!isLoggedIn ? (
                <>
                  <IconButton sx={navbarIconButton} onClick={() => login(true)}>
                    <SoftBox style={{ display: "flex", alignItems: "center" }}>
                      <Icon
                        sx={({ palette: { dark, white } }) => ({
                          color: light ? white.main : dark.main,
                        })}
                      >
                        account_circle
                      </Icon>
                      <SoftTypography
                        variant="button"
                        fontWeight="medium"
                        color={light ? "white" : "dark"}
                      >
                        관리자
                      </SoftTypography>
                    </SoftBox>
                  </IconButton>
                  <IconButton sx={navbarIconButton} onClick={() => login(false)}>
                    <SoftBox style={{ display: "flex", alignItems: "center" }}>
                      <Icon
                        sx={({ palette: { dark, white } }) => ({
                          color: light ? white.main : dark.main,
                        })}
                      >
                        account_circle
                      </Icon>
                      <SoftTypography
                        variant="button"
                        fontWeight="medium"
                        color={light ? "white" : "dark"}
                      >
                        사용자
                      </SoftTypography>
                    </SoftBox>
                  </IconButton>
                </>
              ) : (
                <IconButton sx={navbarIconButton} onClick={login}>
                  <SoftTypography
                    mr={7}
                    style={{ maxWidth: "210px", minWidth: "210px" }}
                    variant="body2"
                    fontWeight="medium"
                  >
                    <SoftTypography variant="body3" fontWeight="bold" color="dark">
                      {"<"}
                      {isAdmin ? "관리자" : "사용자"}
                      {"> "}
                    </SoftTypography>
                    <SoftTypography variant="body3" fontWeight="medium" color="info">
                      {loginName}{" "}
                    </SoftTypography>
                    님 환영합니다!
                  </SoftTypography>
                </IconButton>
              )}
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
