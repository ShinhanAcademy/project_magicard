import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types"; // PropTypes import 추가

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
import SidenavCard from "examples/Sidenav/SidenavCard";

// Custom styles for the Sidenav
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";
import { setMiniSidenav } from "mk/slices/softui";
import { NavLink, useLocation } from "react-router-dom";

function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.user.employeeCode);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const { miniSidenav, transparentSidenav } = useSelector((state) => state.layout);
  const location = useLocation();
  const { pathname } = location;
  const collapseName = pathname.split("/").slice(1)[0];

  console.log("isLoggedIn!!!!!!!!!!!!", isLoggedIn);
  const closeSidenav = () => {
    dispatch(setMiniSidenav(true));
  };

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      dispatch(setMiniSidenav(window.innerWidth < 1200));
    }

    // The event listener that's calling the handleMiniSidenav function when resizing the window.
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch]);

  useEffect(() => {
    console.log("admin?", isAdmin);
    renderRoutes;
  }, [isAdmin]);

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes
    .filter((route) => {
      // route.isAdmin (true) => 관리자 메뉴 렌더링
      console.log(isAdmin);
      return route.isAdmin ? (isAdmin ? true : false) : true;
    })
    .map(({ type, name, icon, title, noCollapse, key, route, href, isAdmin }) => {
      let returnValue;

      if (type === "collapse") {
        returnValue = href ? (
          <Link
            href={href}
            key={key}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
            <SidenavCollapse
              color={color}
              name={name}
              icon={icon}
              active={key === collapseName}
              noCollapse={noCollapse}
            />
          </Link>
        ) : (
          <NavLink to={route} key={key}>
            <SidenavCollapse
              color={color}
              key={key}
              name={name}
              icon={icon}
              active={key === collapseName}
              noCollapse={noCollapse}
            />
          </NavLink>
        );
      } else if (type === "title") {
        returnValue = (
          <SoftTypography
            key={key}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            opacity={0.6}
            pl={3}
            mt={2}
            mb={1}
            ml={1}
          >
            {title}
          </SoftTypography>
        );
      } else if (type === "divider") {
        returnValue = <Divider key={key} />;
      }

      return returnValue;
    });

  return (
    <SidenavRoot {...rest} variant="permanent" ownerState={{ transparentSidenav, miniSidenav }}>
      <div style={{ backgroundColor: "#CBE1D4", height: "100vw" }}>
        <SoftBox pt={3} pb={1} px={4} textAlign="center">
          <SoftBox
            display={{ xs: "block", xl: "none" }}
            position="absolute"
            top={0}
            right={0}
            p={1.625}
            onClick={closeSidenav}
            sx={{ cursor: "pointer" }}
          >
            <SoftTypography variant="h6" color="secondary">
              <Icon sx={{ fontWeight: "bold" }}>close</Icon>
            </SoftTypography>
          </SoftBox>
          <SoftBox
            component={NavLink}
            to="/"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {brand && (
              <SoftBox mt={1} component="img" src={brand} alt="Soft UI Logo" width="9rem" />
            )}
            <SoftBox
              width={!brandName && "100%"}
              sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
            >
              {/* <SoftTypography component="h6" variant="button" fontWeight="bold">
                {brandName}
              </SoftTypography> */}
            </SoftBox>
          </SoftBox>
        </SoftBox>
        <Divider />
        {isLoggedIn && <List>{renderRoutes}</List>}
        <SoftBox pt={"100%"} my={2} mx={2} mt="auto">
          {/* <SidenavCard /> */}
        </SoftBox>
      </div>
    </SidenavRoot>
  );
}

// PropTypes 추가
Sidenav.propTypes = {
  color: PropTypes.string.isRequired,
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
      title: PropTypes.string,
      noCollapse: PropTypes.bool,
      key: PropTypes.string.isRequired,
      route: PropTypes.string,
      href: PropTypes.string,
    })
  ).isRequired,
};

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
};

export default Sidenav;
