import React from 'react';
import * as echarts from 'echarts/core';
import { Card } from '@mui/material';
import GradientLineChart from 'examples/Charts/LineCharts/GradientLineChart';
import monthlyData from 'component_jw/data/CumulativeSpendingData/monthlyData';

const CumulativeSpendingChart = () => {
  

  return <Card>
      <GradientLineChart
                title="지출 추이"
                height="40rem"
                chart={monthlyData}
              />
    </Card>
    
};

export default CumulativeSpendingChart;
