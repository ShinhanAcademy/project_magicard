import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

// ChartJS 모듈 등록
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const ChartQuarterly = ()=>{
 // 차트 데이터 설정

 const quarterlyData = [2600, 1290, 1280, 2370];

  // 누적 데이터 계산
  const accumulatedData = quarterlyData.map((sum => value => sum += value)(0));
  
  // 평균 데이터 계산
  const averageValue = quarterlyData.reduce((acc, curr) => acc + curr, 0) / quarterlyData.length;
  const averageData = new Array(quarterlyData.length).fill(averageValue);


 const data = {
    labels: ['1분기', '2분기', '3분기', '4분기'], 
    datasets: [
      {
        label: '분기별 지출액',
        data: quarterlyData,
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor:'rgba(54, 162, 235, 1)',
    },
      {
        label: '누적 지출액',
        data: accumulatedData,
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor:'rgba(255, 99, 132, 1)',
    },
      {
        label: '평균 지출액',
        data: averageData,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor:'rgba(255, 255, 255, 1)',
        borderDash: [5, 5], // 점선으로 표시
      }
    ],
  };

  // 차트 옵션 설정
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '지출 추이',
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // X축 그리드 라인 숨기기
        },
      },
      y: {
        grid: {
          // display: false, // Y축 그리드 라인 숨기기
        }, 
      },
    },
  };

  return (
    <div >
      <Line data={data} options={options} placeholder={data}/>
    </div>
    )
}

export default ChartQuarterly;