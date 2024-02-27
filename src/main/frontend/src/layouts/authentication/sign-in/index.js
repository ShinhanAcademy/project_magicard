import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import back from "assets/images/mk/loginBackground.png";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import main from "assets/images/mk/main.png";
import { useDispatch, useSelector } from "react-redux";
import { setTransparentSidenav } from "mk/slices/softui";
import { setFixedNavbar } from "mk/slices/softui";
import PageLayout from "examples/LayoutContainers/PageLayout";

function SignIn() {
  const dispatch = useDispatch();
  const { transparentNavbar, fixedNavbar } = useSelector((state) => state.layout);

  // console.log("transparentNavbar", transparentNavbar);
  // console.log("fixedNavbar", fixedNavbar);

  return (
    <PageLayout>
      <DashboardNavbar />
      <SoftBox>
        <img src={main} alt="main" style={{ width: "100%" }} />
      </SoftBox>
    </PageLayout>
  );
}

export default SignIn;
