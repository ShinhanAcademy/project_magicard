import React from 'react';
import ReactECharts from 'echarts-for-react';
// `echarts`를 직접 import합니다.
import * as echarts from 'echarts/core';
import { Card, Grid, MenuItem, Select } from '@mui/material';

const dataAxis = ['인사팀', '구매계약팀', '전략기획팀', '재무팀', '인재개발팀', '직원만족팀', '글로벌사업팀', '글로벌개발팀', '뱅킹금융팀', '뱅킹정보팀', '뱅킹모바일팀', '금융보안1팀', '금융보안2팀', '보안컨설팅1팀', '보안컨설팅2팀', '인프라사업팀', '은행인프라팀', '카드인프라팀', '그룹인프라팀', '인프라ASP팀'];
const data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];

const DepartmentalSpendingChart = () => {
  // 데이터와 옵션 설정

  const option = {
    title: {
      subtext: '스크롤하여 그래프 확대 가능',
      height:'40rem'
    },
    xAxis: {
      data: dataAxis,
      axisLabel: {
        inside: false,
        color: '#333',
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
        color: '#999',
      },
    },
    dataZoom: [
      {
        type: 'inside',
      },
    ],
    series: [
      {
        type: 'bar',
        showBackground: false,
        barWidth: '60%', // 막대의 너비 설정
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#b7d7c8' },
            { offset: 0.5, color: '#b7d7c8' },
            { offset: 1, color: '#cbe1d4' },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#b8e994' },
              { offset: 0.5, color: '#58D68D' },
              { offset: 1, color: '#28B463' },
            ]),
          },
        },
        data: data,
      },
    ],
  };

  return (
    <Card>
      <Grid container spacing={2}  justifyContent="flex-space-evenly" style={{ padding: '16px' }} >
        <Grid item xs={12} sm={6}> 
          <Select >
            <MenuItem value="상위 부서">상위 부서</MenuItem>
            <MenuItem value="상위 부서">상위 부서</MenuItem>
            <MenuItem value="상위 부서">상위 부서</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={6} container> 
          <Select>
            <MenuItem value="하위 부서">하위 부서</MenuItem>
            <MenuItem value="하위 부서">하위 부서</MenuItem>
            <MenuItem value="하위 부서">하위 부서</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <ReactECharts option={option} />
    </Card>   
)};

export default DepartmentalSpendingChart;
