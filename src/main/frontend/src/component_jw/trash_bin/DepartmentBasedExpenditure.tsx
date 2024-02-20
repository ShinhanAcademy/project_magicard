import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

// ChartJS 모듈 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DepartmentBasedExpenditure = () => {
  // 차트 데이터 설정
  const data = {
    labels: ["영업 부서", "개발 부서", "전략지원 부서", "마케팅 부서", "R&D 부서"],
    datasets: [
      {
        label: "지출액",
        data: [121000, 215000, 313000, 217000, 500000], // 부서별 지출액 데이터
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // 차트 옵션 설정
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: "부서별 지출액",
      },
    },
  };

  return (
    <div style={{ width: "700px" }}>
      <Bar data={data} options={options} placeholder={data} />
    </div>
  );
};

export default DepartmentBasedExpenditure;
