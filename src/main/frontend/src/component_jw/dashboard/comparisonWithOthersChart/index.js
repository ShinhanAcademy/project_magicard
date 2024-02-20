import React, { useState, useEffect } from 'react';
import { Card, Grid, MenuItem, Select } from '@mui/material';
import GradientLineChart from 'examples/Charts/LineCharts/GradientLineChart';
import myCompanyData from 'component_jw/data/ComparisonWithOthersData/myCompanyData';
import otherCompaniesData from 'component_jw/data/ComparisonWithOthersData/otherCompaniesData';

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
              >
              <MenuItem value="">기업 선택...</MenuItem>
              <MenuItem value="하나금융티아이">하나금융티아이 </MenuItem>
              <MenuItem value="우리FIS">우리FIS </MenuItem>
            </Select>
          </Grid> 
        </Grid>
        <Grid item xs={12} >
            <GradientLineChart
            height="100%"
            chart={chartData}
            options={options}
          />                
        </Grid>
      </Grid>
    </Card>
  );    
};

export default ComparisonWithOthersChart;
