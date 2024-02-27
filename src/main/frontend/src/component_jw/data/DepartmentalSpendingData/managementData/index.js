import React from 'react';
import ReactECharts from 'echarts-for-react';

const ManagementData = () => {
    const departments = [
        "전략기획팀", "재무팀", "인재개발팀", "직원만족팀",
        "인사팀",
        "구매계약팀",
        
    ];
    
    const spend = [
        220, 182, 191, 234, 290, 330, 
       
    ];

    const departmentCategoryData = departments.map((data, index) => ({
        department: data,
        spend: {
        인건비: spend[index],
        행사비: Math.floor(spend[index] * 0.3),
        식비: Math.floor(spend[index] * 0.2),
        },
    }));

    // 데이터와 옵션 설정
    const option = {
        title: {
        subtext: "스크롤하여 그래프 확대 가능",
        subtextStyle: {
            align: "right",
        },
        right: "10%", // 오른쪽 여백을 5%로 설정합니다.
        top: "5%", // 상단 여백을 5%로 설정합니다.
        // height:'40rem'
        },
        xAxis: {
        type: "category",
        data: departmentCategoryData.map((data) => data.department),
        axisLabel: {
            inside: false,
            color: "#333",
            fontSize: 14, // 폰트 크기를 설정
            fontWeight: 600, // 상대적으로 더 두꺼운 폰트
            interval: 0, // 모든 레이블을 강제로 표시
           
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
            color: "#999",
        },
        },
        dataZoom: [
        {
            type: "inside",
        },
        ],
        series: [
        {
            type: "bar",
            name: "인건비",
            data: departmentCategoryData.map((data) => data.spend.인건비),
            stack: "비용",
            itemStyle: {
            color: "#b7d7c8",
            },
            emphasis: {
            focus: "series",
            label: {
                show: true,
                position: "top",
                formatter: "인건비: {c} 만원",
            },
            },
            barWidth: 70,
        },
        {
            type: "bar",
            name: "행사비",
            data: departmentCategoryData.map((data) => data.spend.행사비),
            stack: "비용",
            itemStyle: {
            color: "#ffd700",
            },
            emphasis: {
            focus: "series",
            label: {
                show: true,
                position: "top",
                formatter: "행사비: {c} 만원",
            },
            },
        },
        {
            type: "bar",
            name: "식비",
            data: departmentCategoryData.map((data) => data.spend.식비),
            stack: "비용",
            itemStyle: {
            color: "#36454F",
            },
            emphasis: {
            focus: "series",
            label: {
                show: true,
                position: "top",
                formatter: "식비: {c} 만원",
            },
            },
        },
        ],
    };

    return (
        <ReactECharts option={option} style={{ height: 400 }} />
    );
};

export default ManagementData;