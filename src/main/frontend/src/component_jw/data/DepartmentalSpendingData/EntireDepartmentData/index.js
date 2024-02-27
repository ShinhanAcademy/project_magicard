import React from 'react';
import ReactECharts from 'echarts-for-react';

const EntireDepartmentData = () => {
    const departments = [
        "전략기획팀", "재무팀", "인재개발팀", "직원만족팀",
        "인사팀",
        "구매계약팀",
        "글로벌사업팀","글로벌개발팀","클라우드 기획팀", "통합 운영센터",
        "DT사업팀", "DT지원팀", "모바일 서비스팀", "디지털커넥트팀", "SFL팀",
        "뱅킹금융팀","뱅킹정보팀","벵킹채널팀","뱅킹모바일팀","SFL팀",
        "카드Biz팀","라이프Biz팀","그룹Biz팀",
        "금융보안1팀","금융보안2팀","보안컨설팅1팀","보안컨설팅2팀",
        "인프라사업팀","은행인프라팀","카드인프라팀","그룹인프라팀","인프라ASP팀",
    ];
    
    const spend = [
        220, 182, 191, 234, 290, 330, 
        310, 123, 442, 321,
        590, 149, 210, 122, 133, 
        334, 198, 123, 125, 220,
        322,249,362,
        205,301,242,195,
        151,311,278,411,221
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
            // interval: 0, // 모든 레이블을 강제로 표시
            
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

export default EntireDepartmentData;