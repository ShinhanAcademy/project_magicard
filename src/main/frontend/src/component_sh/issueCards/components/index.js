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

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import CateogryForm from "./Invoices";
import CateogryList from "./Invoices";
import CateogryListMain from "./Invoices";

function PurposeCategory() {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center", // 이미지를 가로 방향으로 중앙에 정렬
      gap: "120px", // 이미지 간의 간격
    },
  };

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox mt={4}>
          <SoftBox mb={1.5}>
            <div style={styles.container}>
              <Grid container spacing={3}>
                <Grid item xs={16} lg={16}>
                  <Grid container spacing={5}>
                    <Grid item xs={16}>
                      <CateogryListMain></CateogryListMain>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </SoftBox>
        </SoftBox>
        <Footer />
      </DashboardLayout>
    </>
  );
}

export default PurposeCategory;
