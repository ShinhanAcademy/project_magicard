import React from 'react';
import ReactECharts from 'echarts-for-react';
// `echarts`를 직접 import합니다.
import * as echarts from 'echarts/core';
import { Card } from '@mui/material';

const SpendingByPurposeChart = () => {
  const dataAxis = ["용도1","용도2","용도3","용도4","용도5","용도6","용도7","용도8",];
  const data = [220, 182, 191, 234, 290,320,220,400];

  const option = {
    title: {
      text: '용도별 지출 추이',
      subtext: '확대 가능',
    },
    xAxis: {
      data: dataAxis,
      axisLabel: {
        inside: false,
        color: '#333',
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
        showBackground: true,
        barWidth: '60%', // 막대의 너비 설정
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#b7d7c8' },
            { offset: 0.5, color: '#cbe1d4' },
            { offset: 1, color: '#daf0e5' },
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

  return <Card>
      <ReactECharts option={option} />
    </Card>
    
};

export default SpendingByPurposeChart;
