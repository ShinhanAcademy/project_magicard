import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import SoftBox from "components/SoftBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";
import routes from "routes";
// import { setMiniSidenav, setOpenConfigurator, useSoftUIController } from "context";
import brand from "assets/images/mk/magicardLogoBlack.png";
import { setMiniSidenav } from "mk/slices/softui";
import { setOpenConfigurator } from "mk/slices/softui";
import SignIn from "layouts/authentication/sign-in";

export default function App() {
  const controller = useSelector((state) => state.layout); // 상태 가져오기
  const dispatch = useDispatch(); // 디스패치 함수 가져오기
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const isLoggedIn = useSelector((state) => state.user.employeeCode);
  const isAdmin = useSelector((state) => state.user.isAdmin);

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

  // componentDidMount() {
  //     this.initializeUserInfo();
  // }

  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
    });
    setRtlCache(cacheRtl);
  }, []);

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      dispatch(setMiniSidenav(false)); // 액션 디스패치
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      dispatch(setMiniSidenav(true)); // 액션 디스패치
      setOnMouseEnter(false);
    }
  };

  const handleConfiguratorOpen = () => dispatch(setOpenConfigurator(!openConfigurator)); // 액션 디스패치

  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    if (document.scrollingElement != null) {
      document.scrollingElement.scrollTop = 0;
    }
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes
      .filter((route) => {
        console.log(isAdmin);
        return route.isAdmin ? (isAdmin ? true : false) : true;
      })
      .map((route) => {
        if (route.collapse) {
          return getRoutes(route.collapse);
        }

        if (route.route) {
          // console.log(route.route);
          return <Route exact path={route.route} element={route.component} key={route.key} />;
        }

        return null;
      });

  const configsButton = (
    <SoftBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </SoftBox>
  );

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={themeRTL}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={brand}
              brandName="magiCard"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}
          </>
        )}
        {layout === "vr" && <Configurator />}
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName="magiCard"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
      {isLoggedIn ? (
        <Routes>
          {getRoutes(routes)}
          {isAdmin ? (
            <>
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            <>
              <Route path="*" element={<Navigate to="/payments/*" />} />
            </>
          )}
        </Routes>
      ) : (
        <Routes>
          {getRoutes([
            {
              name: "로그인",
              key: "sign-in",
              route: "/authentication/sign-in",
              component: <SignIn />,
              noCollapse: true,
            },
          ])}
          <Route path="*" element={<Navigate to="/authentication/sign-in" />} />
        </Routes>
      )}
      {/* <Routes>
        {getRoutes(routes)}
        {isAdmin ? (
          <Route path="*" element={<Navigate to="/dashboard" />} />
        ) : (
          <Route path="*" element={<Navigate to="/payments/*" />} />
        )}
      </Routes> */}
    </ThemeProvider>
  );
}
