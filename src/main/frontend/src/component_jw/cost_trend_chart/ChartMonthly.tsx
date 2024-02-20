import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

// ChartJS 모듈 등록
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartMonthly = () => {
  // 차트 데이터 설정

  // 월별 데이터
  const monthlyData = [1000, 1200, 400, 560, 430, 300, 230, 600, 450, 420, 650, 1300];

  // 누적 데이터 계산
  const accumulatedData = monthlyData.map(
    (
      (sum) => (value) =>
        (sum += value)
    )(0)
  );

  // 평균 데이터 계산
  const averageValue = monthlyData.reduce((acc, curr) => acc + curr, 0) / monthlyData.length;
  const averageData = new Array(monthlyData.length).fill(averageValue);

  const data = {
    labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    datasets: [
      {
        label: "월별 지출액",
        data: monthlyData,
        fill: false,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        pointBorderColor: "rgba(54, 162, 235, 1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(54, 162, 235, 1)",
        pointHoverBorderColor: "rgba(220, 220, 220, 1)",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
      },
      {
        label: "누적 지출액",
        data: accumulatedData,
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",

        pointBorderColor: "rgba(255, 99, 132, 1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(255, 99, 132, 1)",
        pointHoverBorderColor: "rgba(220, 220, 220, 1)",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
      },
      {
        label: "평균 지출액",
        data: averageData,
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderDash: [10, 5],
        pointBorderColor: "rgba(75, 192, 192, 1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
        pointHoverBorderColor: "rgba(220, 220, 220, 1)",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
      },
    ],
  };

  // 차트 옵션 설정
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "지출 추이",
      },
    },
    elements: {
      line: {
        tension: 0.4, // 라인의 곡률 조정
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

  return <Line data={data} options={options} placeholder={data} />;
};

export default ChartMonthly;
