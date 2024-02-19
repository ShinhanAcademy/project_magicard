import React, { useState, useEffect } from 'react';
import { Card, Grid, MenuItem, Select } from '@mui/material';
import GradientLineChart from 'examples/Charts/LineCharts/GradientLineChart';

// 가정: 서버에서 가져온 다른 기업들의 데이터
const otherCompaniesData = {
    "하나금융티아이": [200, 210, 350, 300],
    "우리FIS": [210, 300, 250, 280],

};

// 내 기업 데이터는 default 값
const myCompanyData = {
  labels: ["1분기","2분기","3분기","4분기"],
  datasets: [{
    label: "my company",
    color: "info",
    data: [200, 300, 325, 220],
  }]
};

const ComparisonWithOthersChart = () => { 
  const [selectedCompany, setSelectedCompany] = useState('');
  const [chartData, setChartData] = useState(myCompanyData);

  useEffect(() => {
    // 선택된 다른 기업 데이터를 내 기업 데이터와 함께 표시
    if (selectedCompany) {
      const updatedData = {
        ...myCompanyData,
        datasets: [
          ...myCompanyData.datasets,
          {
            label: selectedCompany,
            color: "dark",
            data: otherCompaniesData[selectedCompany],
          }
        ]
      };
      setChartData(updatedData);
    } else {
      // 다른 기업이 선택되지 않았으면, 내 기업 데이터만 표시
      setChartData(myCompanyData);
    }
  }, [selectedCompany]);

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const options = {
    yAxis: {
        min: 0,      // y축의 최소값을 0으로 설정
        max: 1000,   // y축의 최대값을 1000으로 설정
        scale:false,
      }
  };

  return (
    <Card>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid item xs={12}>
          <Grid container justifyContent="flex-end" style={{ padding: '16px' }}>    
            <Select
              value={selectedCompany}
              onChange={handleCompanyChange}
              displayEmpty
                        
              style={{
                backgroundColor: '#cbe1d4', // 배경색 설정
                width:'120px'
              }}
              >
              <MenuItem value="">기업 선택...</MenuItem>
              <MenuItem value="하나금융티아이">하나금융티아이 </MenuItem>
              <MenuItem value="우리FIS">우리FIS </MenuItem>
            </Select>
          </Grid> 
        </Grid>
        <Grid item xs={12} >
            <GradientLineChart
            chart={chartData}
            options={options}
          />                
        </Grid>
      </Grid>
    </Card>
  );    
};

export default ComparisonWithOthersChart;
