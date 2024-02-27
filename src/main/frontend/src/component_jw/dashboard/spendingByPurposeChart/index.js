import React, { useState, useEffect } from "react";
import { Card, Grid, MenuItem, Select } from "@mui/material";
import axios from "axios";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
import { TitleComponent, TooltipComponent, LegendComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import {
  purposeCategory,
  peoPurposeItem,
  carPurposeItem,
  outPurposeItem,
  advPurposeItem,
  peoOtion,
  carOption,
  outOption,
  advOption,
  peoLine,
  carLine,
  outLine,
  advLine,
} from "../../data/spendingByPurposeChartData/spendingByPurposeChartData";

// 필요한 컴포넌트 등록
echarts.use([PieChart, TitleComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

const SpendingByPurposeChart = () => {
  const [selectedPurposeCategory, setSelectedPurposeCategory] = useState(purposeCategory[0]);
  const [purposeData, setPurposeData] = useState([]); //조건 없는 전체 purpose에 따른 data
  const [pieOption, setPieOption] = useState([]); //이번 달 금액&&purpose_item
  const [pieAmountData, setPieAmountData] = useState([]);
  const [piePurposeItem, setPiePurposeItem] = useState([]);
  const [newData, setNewData] = useState([]);
  const [monthLabels, setMonthLabels] = useState([]);
  const [lineChartOption, setLineChartOption] = useState();
  const [lineData, setLineData] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  // 전체 data 가져오기(조건X)
  useEffect(() => {
    axios({
      method: "Get",
      url: "/requests/approvalRequest",
    })
      .then((res) => {
        setPurposeData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Pie 데이터 불러오기 및 가공
  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const filteredDate = purposeData.filter((data) => {
      const dataDate = new Date(data.payment_month);
      const dataYear = dataDate.getFullYear();
      const dataMonth = dataDate.getMonth() + 1;
      return (
        dataYear === currentYear &&
        dataMonth === currentMonth &&
        data.purpose_category === selectedPurposeCategory
      );
    });

    const newPieData = filteredDate.map((data) => ({
      purposeItem: data.purpose_item,
      totalAmount: data.total_pay_amount,
    }));

    setPieOption(newPieData);
    const newPieAmountData = newPieData.map((data) => data.totalAmount);
    setPieAmountData(newPieAmountData);
    const newPiePurposeItem = newPieData.map((data) => data.purposeItem);
    setPiePurposeItem(newPiePurposeItem);
  }, [purposeData, selectedPurposeCategory]);

  // 무작위 색상 생성 함수
  const getRandomColor = (count, existingColors) => {
    const colors = [];
    const isValidColor = (color) => {
      // 기존 색상과 중복되지 않는지 확인
      return !existingColors.includes(color);
    };

    while (colors.length < count) {
      const alpha = Math.random() * (0.5 - 0.1) + 0.1;
      const color = `rgb(255,112,112, ${alpha})`;

      if (isValidColor(color)) {
        colors.push(color);
        existingColors.push(color); // 새로운 색상을 기존 목록에 추가
      }
    }

    return colors;
  };

  //pie chart
  // 데이터의 가장 큰 값의 인덱스 찾기
  const maxIndex = pieOption.reduce((maxIndex, item, index, arr) => {
    return item.totalAmount > arr[maxIndex].totalAmount ? index : maxIndex;
  }, 0);

  // getRandomColor 함수를 호출하여 colors 변수 초기화
  const colors = getRandomColor(pieOption.length, []);

  // Pie 차트 옵션 설정
  const inPieChartOptions = {
    title: {
      text: "용도별 지출 비율",
      textStyle: {
        fontSize: 18,
      },
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: function (params) {
        const formattedValue = params.data.value.toLocaleString();
        return `${params.name} <br/> 총 ${formattedValue}원 (${params.percent}%)`;
      },
    },

    legend: {
      orient: "horizontal",
      bottom: 0,
      data: (() => {
        if (selectedPurposeCategory === "인테리어 비용") {
          return piePurposeItem;
        } else if (selectedPurposeCategory === "인건비") {
          return peoPurposeItem;
        } else if (selectedPurposeCategory === "차랑유지비") {
          return carPurposeItem;
        } else if (selectedPurposeCategory === "출장비") {
          return outPurposeItem;
        } else if (selectedPurposeCategory === "광고비") {
          return advPurposeItem;
        }
        return [];
      })(),
    },

    series: [
      {
        itemStyle: {
          borderWidth: "3",
          borderColor: "#ffffff",
        },
        name: "Purpose Item",
        type: "pie",
        radius: "80%", // 차트 크기 조절
        center: ["50%", "50%"],
        avoidLabelOverlap: false,
        label: {
          show: true,
          align: "center",
          position: "inside",
          formatter: `{b} \n \n {d}%`,
          fontSize: 13,
          color: "black",
        },
        labelLine: {
          show: false,
        },
        data: (() => {
          if (selectedPurposeCategory === "인테리어 비용") {
            return pieOption.map((item, index) => ({
              value: item.totalAmount,
              name: item.purposeItem,
              itemStyle: {
                color: index === maxIndex ? "rgb(255,112,112)" : colors[index],
              },
            }));
          } else if (selectedPurposeCategory === "인건비") {
            return peoOtion;
          } else if (selectedPurposeCategory === "차랑유지비") {
            return carOption;
          } else if (selectedPurposeCategory === "출장비") {
            return outOption;
          } else if (selectedPurposeCategory === "광고비") {
            return advOption;
          }
          return [];
        })(),
      },
    ],
  };

  //Line 데이터 불러오기 및 가공
  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1;

    // 6개월 전의 달 구하기
    let sixMonthsAgoMonth = currentMonth - 6;
    let sixMonthsAgoYear = currentYear;

    // 현재 달이 6개월 이전의 달보다 작은 경우
    if (sixMonthsAgoMonth <= 0) {
      sixMonthsAgoMonth += 12; // 12를 더하면 이전 해의 달이 됨
      sixMonthsAgoYear -= 1; // 연도를 하나 줄임
    }

    // 6개월 전의 날짜 구하기
    const sixMonthsAgoDate = new Date(sixMonthsAgoYear, sixMonthsAgoMonth - 1);

    // 6개월 전부터 현재까지의 연월을 저장할 배열
    const newMonthLabels = [];

    // 6개월 전부터 현재까지의 연월을 배열에 넣기
    for (let i = 0; i < 6; i++) {
      newMonthLabels.push(`${sixMonthsAgoYear}-${sixMonthsAgoMonth}`);

      // 다음 년도 1월로 이동
      sixMonthsAgoMonth += 1;
      if (sixMonthsAgoMonth > 12) {
        sixMonthsAgoMonth = 1;
        sixMonthsAgoYear += 1;
      }
    }
    setMonthLabels(newMonthLabels); // 현재까지 년도 배열 저장

    const filteredData = purposeData.filter((data) => {
      const dataDate = new Date(data.payment_month);

      // 데이터의 날짜가 6개월 전 날짜 이후인지 확인하고, 선택된 카테고리와 일치하는지 확인
      return dataDate >= sixMonthsAgoDate && data.purpose_category === selectedPurposeCategory;
    });

    const newData = {};
    filteredData.forEach((data) => {
      const dataDate = new Date(data.payment_month);
      const diffMonths =
        (currentYear - dataDate.getFullYear()) * 12 + (currentMonth - dataDate.getMonth());

      if (!newData[data.purpose_item]) {
        newData[data.purpose_item] = Array.from({ length: 6 }, () => 0);
      }

      // 데이터를 월에 맞게 저장합니다.
      newData[data.purpose_item][6 - diffMonths] += data.total_pay_amount;
    });

    const newLineData = Object.entries(newData).map(([purposeItem, totalAmounts]) => ({
      purposeItem,
      totalAmounts,
    }));
    setLineData(newLineData);

    const newSeriesData = newLineData.map((item) => ({
      name: item.purposeItem,
      type: "line",
      data: item.totalAmounts, // 각 항목의 총 지출액 데이터
    }));

    setSeriesData(newSeriesData);
  }, [purposeData, selectedPurposeCategory]);

  // Echarts 옵션 설정
  const inlineChartOptions = {
    title: {
      text: "6개월간 각 항목별 지출",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        animation: false,
        label: {
          backgroundColor: "#283b56",
        },
      },
    },
    legend: {
      data: (() => {
        if (selectedPurposeCategory === "인테리어 비용") {
          return lineData.map((item) => item.purposeItem);
        } else if (selectedPurposeCategory === "인건비") {
          return peoPurposeItem;
        } else if (selectedPurposeCategory === "차랑유지비") {
          return carPurposeItem;
        } else if (selectedPurposeCategory === "출장비") {
          return outPurposeItem;
        } else if (selectedPurposeCategory === "광고비") {
          return advPurposeItem;
        }
        return [];
      })(),
      top: 30,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: monthLabels, // 현재로부터 6개월 전까지의 연월 정보
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value} 원",
      },
    },
    series: (() => {
      if (selectedPurposeCategory === "인테리어 비용") {
        return seriesData;
      } else if (selectedPurposeCategory === "인건비") {
        return peoLine;
      } else if (selectedPurposeCategory === "차랑유지비") {
        return carLine;
      } else if (selectedPurposeCategory === "출장비") {
        return outLine;
      } else if (selectedPurposeCategory === "광고비") {
        return advLine;
      }
      return [];
    })(),
  };

  //handle purpose_category
  const handlePurposeCategory = (e) => {
    console.log(selectedPurposeCategory);
    setSelectedPurposeCategory(e.target.value);
  };

  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="flex-space-evenly" style={{ padding: "16px" }}>
            <Select value={selectedPurposeCategory} onChange={handlePurposeCategory} displayEmpty>
              {purposeCategory.map((category, ind) => (
                <MenuItem key={ind} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} style={{ display: "flex", justifyContent: "center" }}>
            <ReactECharts option={inPieChartOptions} style={{ width: "100%", height: "500px" }} />
          </Grid>
          <Grid item xs={12} md={8} style={{ display: "flex", justifyContent: "center" }}>
            <ReactECharts option={inlineChartOptions} style={{ height: "500px", width: "100%" }} />
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SpendingByPurposeChart;
