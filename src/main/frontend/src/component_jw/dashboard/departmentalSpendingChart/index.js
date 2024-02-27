import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";
import { Card, Grid, MenuItem, Select } from "@mui/material";
import { List, ListItem, ListItemText } from "@mui/material";
import "./index.css";
import SoftTypography from "components/SoftTypography";
import WholeDepartmentData from "component_jw/data/DepartmentalSpendingData/EntireDepartmentData";
import EntireDepartmentData from "component_jw/data/DepartmentalSpendingData/EntireDepartmentData";
import StrategicBusinessData from "component_jw/data/DepartmentalSpendingData/StrategicBusinessData";
import DigitalData from "component_jw/data/DepartmentalSpendingData/DigitalData";
import BankingBizData from "component_jw/data/DepartmentalSpendingData/BankingBizData";
import GroupBizData from "component_jw/data/DepartmentalSpendingData/GroupBizData";
import InfoSecurityData from "component_jw/data/DepartmentalSpendingData/InfoSecurityData";
import InfrastructureData from "component_jw/data/DepartmentalSpendingData/InfrastructureData";
import ManagementData from "component_jw/data/DepartmentalSpendingData/managementData";



const DepartmentalSpendingChart = () => {
  const [select, setSelect] = useState(1); 

  const onChange = (e) => {
    setSelect(parseInt(e.target.value, 10)); // e.target.value를 숫자로 변환
  };

  return (
    <Card>
      <Grid container spacing={2} justifyContent="flex-space-evenly" style={{ padding: "1%" }}>
        <Grid item xs={12} sm={12}>
          <Select
            value={select}
            onChange={onChange}
            displayEmpty // 이 속성으로 인해 Select가 비어있을 때도 placeholder가 보여집니다. 
          >
            <MenuItem value={1}>전체부서</MenuItem>
            <MenuItem value={2}>경영부문</MenuItem>
            <MenuItem value={3}>전략사업부문</MenuItem>
            <MenuItem value={4}>디지털본부</MenuItem>
            <MenuItem value={5}>뱅킹Biz본부</MenuItem>
            <MenuItem value={6}>그룹Biz본부</MenuItem>
            <MenuItem value={7}>정보보호본부</MenuItem>
            <MenuItem value={8}>인프라본부</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{ position: "relative", ml: "auto" }}
        style={{ paddingLeft: "1%" }}
      >
        <Grid item xs={12} mb={5}>
          {select == 1? <EntireDepartmentData/> 
          :select == 2? <ManagementData/> 
          :select == 3? <StrategicBusinessData/>
          :select == 4? <DigitalData/>
          :select == 5? <BankingBizData/>
          :select == 6? <GroupBizData/>
          :select == 7? <InfoSecurityData/>
          :select == 8? <InfrastructureData/>
          :<WholeDepartmentData/>
        }  
        </Grid>
      </Grid>
    </Card>
  );
};

export default DepartmentalSpendingChart;