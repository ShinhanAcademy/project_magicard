import React from 'react';
import ReactECharts from 'echarts-for-react';

const InfrastructureData = () => {
    const departments = [
        "인프라사업팀","은행인프라팀","카드인프라팀","그룹인프라팀","인프라ASP팀",
    ];
    
    const spend = [
        151, 311, 278, 411, 221,
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
            color: "#b0b0ff",
            },
            emphasis: {
            focus: "series",
            label: {
                show: true,
                position: "top",
                formatter: "인건비: {c} 만원",
            },
            },
            barWidth: 80,
        },
        {
            type: "bar",
            name: "행사비",
            data: departmentCategoryData.map((data) => data.spend.행사비),
            stack: "비용",
            itemStyle: {
            color: "#b0ddff",
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
            color: "#e4b0d6",
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

export default InfrastructureData;