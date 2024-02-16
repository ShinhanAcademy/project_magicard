import React from 'react';
import ReactECharts from 'echarts-for-react';
// `echarts`를 직접 import합니다.
import * as echarts from 'echarts/core';
import { Card } from '@mui/material';

const DoughnutChart = () => {
  // 데이터와 옵션 설정
  const dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'];
  const data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];

  const option = {
    title: {
      text: '特性示例：渐变色 阴影 点击缩放',
      subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom',
    },
    xAxis: {
      data: dataAxis,
      axisLabel: {
        inside: true,
        color: '#fff',
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

export default DoughnutChart;
