import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
// `echarts`를 직접 import합니다.
import * as echarts from "echarts/core";
import { Card, Grid, MenuItem, Select } from "@mui/material";

const departments = {
  인사팀: [120, 132, 101, 134, 90, 230, 210, 310],
  재무팀: [220, 182, 191, 234, 290, 330, 310, 410],
};
const dataAxis = ["용도1", "용도2", "용도3", "용도4", "용도5", "용도6", "용도7", "용도8"];

const SpendingByPurposeChart = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(Object.keys(departments)[0]);
  const [lineOption, setBarOption] = useState({});
  const [pieOption, setPieOption] = useState({});

 //data axios로 가져와서 용도별 총 합계(이번달 -> pie chart) && data axios : 최근 6개월 추이 

    setBarOption({
      title: {
        subtext: "스크롤하여 그래프 확대 가능",
        subtextStyle: {
          align: "right",
        },
        right: "10%", // 오른쪽 여백을 5%로 설정합니다.
        top: "5%", // 상단 여백을 5%로 설정합니다.
      },
      xAxis: {
        data: dataAxis,
        axisLabel: {
          inside: false,
          color: "#333",
          fontSize: 14, // 폰트 크기를 설정
          fontWeight: 600, // 상대적으로 더 두꺼운 폰트
          interval: 0, // 모든 레이블을 강제로 표시
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
          type: "line",
          showBackground: true,
          // barWidth: "60%", // 막대의 너비 설정
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
          data: data,
        },
      ],
    });

    setPieOption({
      // color: ['#FF0000', '#00FF00', '#0000FF'], // 사용하고 싶은 색상 코드 배열
      tooltip: { trigger: "item" },
      series: [
        {
          name: "지출 분포",
          type: "pie",
          radius: "55%",
          data: pieSeriesData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
      // 파이 차트 옵션 설정을 여기에 추가
    });
  }, [selectedDepartment]);

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="flex-space-evenly" style={{ padding: "16px" }}>
            <Select value={selectedDepartment} onChange={handleDepartmentChange} displayEmpty>
              {Object.keys(departments).map((department) => (
                <MenuItem key={department} value={department}>
                  {department}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} style={{ display: "flex", justifyContent: "center" }}>
            <ReactECharts option={pieOption} style={{ height: "400px", width: "100%" }} />
          </Grid>
          <Grid item xs={12} md={8} style={{ display: "flex", justifyContent: "center" }}>
            <ReactECharts option={barOption} style={{ height: "400px", width: "100%" }} />
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SpendingByPurposeChart;
