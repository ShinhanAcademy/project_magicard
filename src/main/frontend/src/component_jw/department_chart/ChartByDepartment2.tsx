import React from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";



// ChartJS 모듈 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartByDepartment2 = () => {
  // 차트 데이터 설정

  const departmentData = [150000, 300000, 254000, 217000, 100000];

  
  // 평균 데이터 계산
  const averageValue = departmentData.reduce((acc, curr) => acc + curr, 0) / departmentData.length;
  const averageData = new Array(departmentData.length).fill(averageValue);

  const data = {
    labels: ['임대료', '활동비', '통신비', '교육비', '기타'],
    datasets: [
        {
          label: '지출액',
          data: departmentData, // 부서별 지출액 데이터
          backgroundColor: [
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
        {
            label: '평균 지출액',
            data: averageData,
            fill: false,
            backgroundColor:'rgba(255, 99, 132, 1)',
          },
    ],
  };

  // 차트 옵션 설정
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true 
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '부서별 지출액',
      },
    },
  };

  return (
    <Card>
      <Grid >
        <Grid >
          <Bar data={data} options={options} placeholder={data}/>
        </Grid>
        <Grid>

        </Grid>
      </Grid>
    </Card>
  )
  };

export default ChartByDepartment2;
