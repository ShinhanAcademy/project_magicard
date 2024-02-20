import React from 'react';
import { Card } from '@mui/material';
import GradientLineChart from 'examples/Charts/LineCharts/GradientLineChart';
import monthlyData from 'component_jw/data/CumulativeSpendingData/monthlyData';

const CumulativeSpendingChart = () => {
  

  return <Card>
      <GradientLineChart
                width="150rem"
                height="40rem"
                chart={monthlyData}
              />
    </Card>
    
};

export default CumulativeSpendingChart;