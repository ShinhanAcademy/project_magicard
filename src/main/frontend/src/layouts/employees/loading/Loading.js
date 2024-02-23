import { Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import React from "react";
import { MutatingDots } from "react-loader-spinner";

const Loading = () => {
  return (
    <Grid pt={10} item xs={12} display="flex" justifyContent="center" alignItems="center">
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        secondaryColor="#4fa94d"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </Grid>
  );
};

export default Loading;
