import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
// `echarts`를 직접 import합니다.
import * as echarts from "echarts/core";
import { Card, Grid, MenuItem, Select } from "@mui/material";
import { List, ListItem, ListItemText } from "@mui/material";
import "./index.css";
import SoftTypography from "components/SoftTypography";

const departments = [
  "인사팀",
  "구매계약팀",
  "전략기획팀",
  "재무팀",
  "인재개발팀",
  "직원만족팀",
  "글로벌사업팀",
  "글로벌개발팀",
  "뱅킹금융팀",
  "뱅킹정보팀",
  "뱅킹모바일팀",
  "금융보안1팀",
  "금융보안2팀",
  "보안컨설팅1팀",
  "보안컨설팅2팀",
  "인프라사업팀",
  "은행인프라팀",
  "카드인프라팀",
  "그룹인프라팀",
  "인프라ASP팀",
];
const spend = [
  220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220,
];
const superDepartments = [
  "경영부문",
  "전략사업부문",
  "디지털개발부문",
  "인프라&보안부문",
  "경영전략본부",
  "글로벌본부",
  "디지털본부",
  "뱅킹Biz본부",
  "정보보호본부",
  "인프라본부",
];

function getTop5Departments(departments, spend) {
  // 부서와 지출 데이터를 객체의 배열로 결합
  const combinedData = departments.map((department, index) => ({
    department: department,
    spend: spend[index],
  }));
  // 지출액으로 내림차순 정렬
  const sortedData = combinedData.sort((a, b) => b.spend - a.spend);
  // 상위 5개 항목 선택
  const top5 = sortedData.slice(0, 5);

  return top5;
}
const top5Departments = getTop5Departments(departments, spend);

const DepartmentalSpendingChart = () => {
  const [selectedSuperDepartment, setSelectedSuperDepartment] = React.useState("");

  const handleSuperDepartmentChange = (event) => {
    setSelectedSuperDepartment(event.target.value);
  };

  // 데이터와 옵션 설정
  const option = {
    title: {
      subtext: "스크롤하여 그래프 확대 가능",
      subtextStyle: {
        align: "right",
      },
      right: "10%", // 오른쪽 여백을 5%로 설정합니다.
      top: "5%", // 상단 여백을 5%로 설정합니다.
      // height:'40rem'
    },
    xAxis: {
      data: departments,
      axisLabel: {
        inside: false,
        color: "#333",
        fontSize: 14, // 폰트 크기를 설정
        fontWeight: 600, // 상대적으로 더 두꺼운 폰트
        // interval: 0, // 모든 레이블을 강제로 표시
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      z: 10,
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#999",
      },
    },
    dataZoom: [
      {
        type: "inside",
      },
    ],
    series: [
      {
        type: "bar",
        showBackground: false,
        barWidth: "60%", // 막대의 너비 설정
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#b7d7c8" },
            { offset: 0.5, color: "#b7d7c8" },
            { offset: 1, color: "#cbe1d4" },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#b8e994" },
              { offset: 0.5, color: "#58D68D" },
              { offset: 1, color: "#28B463" },
            ]),
          },
        },
        data: spend,
      },
    ],
  };

  return (
    <Card>
      <Grid container spacing={2} justifyContent="flex-space-evenly" style={{ padding: "1%" }}>
        <Grid item xs={12} sm={12}>
          <Select
            value={selectedSuperDepartment}
            onChange={handleSuperDepartmentChange}
            displayEmpty
          >
            <MenuItem value="">전체 부서</MenuItem>
            {superDepartments.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        {/* <Grid item xs={12} sm={6} container> 
          <Select>
            <MenuItem value="하위 부서">하위 부서</MenuItem>
            <MenuItem value="하위 부서">하위 부서</MenuItem>
            <MenuItem value="하위 부서">하위 부서</MenuItem>
          </Select>
        </Grid> */}
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{ position: "relative", ml: "auto" }}
        style={{ paddingLeft: "1%" }}
      >
        <Grid className="gridContainer" item xs={2.5} style={{ paddingTop: "2.75rem" }}>
          <SoftTypography variant="h5" fontWeight="bold" gutterBottom mt={3} mb={3}>
            부서 전체 지출 TOP5
          </SoftTypography>
          <List>
            {top5Departments.map((item, index) => (
              <ListItem key={index} className="listItem">
                <SoftTypography
                  className="department-rank"
                  variant="body2"
                  color="text"
                  fontWeight="medium"
                >
                  {index + 1}
                </SoftTypography>
                <SoftTypography
                  className="department-name"
                  variant="body2"
                  color="text"
                  fontWeight="medium"
                >
                  {item.department}
                </SoftTypography>
                <SoftTypography
                  className="spend-amount"
                  variant="body2"
                  color="text"
                  fontWeight="medium"
                >
                  {item.spend} 만원
                </SoftTypography>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={9.5}>
          <ReactECharts option={option} />
        </Grid>
      </Grid>
    </Card>
  );
};

export default DepartmentalSpendingChart;
