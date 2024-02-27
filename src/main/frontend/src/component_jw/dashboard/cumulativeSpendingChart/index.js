import React, {useState} from 'react';
import { Card, FormControl, Grid,  MenuItem, Select } from '@mui/material';
import GradientLineChart from 'examples/Charts/LineCharts/GradientLineChart';
import monthlyData from 'component_jw/data/CumulativeSpendingData/monthlyData';
import quarterlyData from 'component_jw/data/CumulativeSpendingData/quarterlyData';
import yearlyData from 'component_jw/data/CumulativeSpendingData/yearlyData';

const CumulativeSpendingChart = () => {
  const [select, setSelect] = useState(1); 

  const onChange = (e) => {
    setSelect(parseInt(e.target.value, 10)); // e.target.value를 숫자로 변환
  };

  return (
    <Card>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid item xs={12}>
          <Grid container justifyContent="space-between" style={{ padding: '1rem' }}>
            <FormControl fullWidth  variant="outlined">
              
              <Select
                 value={select}
                 onChange={onChange}
                 displayEmpty // 이 속성으로 인해 Select가 비어있을 때도 placeholder가 보여집니다.
                 inputProps={{ 'aria-label': 'Without label' }} // 레이블이 없음을 명시합니다.
               >
                <MenuItem value={1}>월별</MenuItem>
                <MenuItem value={2}>분기별</MenuItem>
                <MenuItem value={3}>연도별</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {select === 1 ? <Monthly /> : select === 2 ? <Quarterly /> : <Yearly />}
        </Grid>
      </Grid>
    </Card>  
  );};



function Quarterly() {
  return <GradientLineChart
            width="100%"
            height="100%"
            chart={quarterlyData}
            
          />;
}
function Yearly() {
  return <GradientLineChart
            width="100%"
            height="100%"
            chart={yearlyData}
          />;
}
function Monthly() {    
  return <GradientLineChart
            width="100%"
            height="100%"
            chart={monthlyData}
          />;
}


export default CumulativeSpendingChart;