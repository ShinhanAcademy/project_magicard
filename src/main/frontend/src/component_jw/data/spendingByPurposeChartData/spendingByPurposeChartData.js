const purposeCategory = ["인테리어 비용", "인건비", "차랑유지비", "출장비", "광고비"];
const peoPurposeItem = ["급여", "4대보험", "식대", "월급", "기타1"];
const carPurposeItem = ["보험료", "수리비", "주차요금", "통행료"];
const outPurposeItem = ["교통비", "숙박비", "식비"];
const advPurposeItem = ["온라인 광고비", "오프라인 광고비", "프로모션 및 이벤트비"];

//pie
const peoOtion = [
  { value: 1332000000, name: "급여" },
  { value: 132546000, name: "4대 보험" },
  { value: 2834780, name: "식대" },
  { value: 1332450000, name: "월급" },
  { value: 1997800, name: "기타 인건비1" },
];

const carOption = [
  { value: 5000000, name: "보험료" },
  { value: 1800000, name: "수리비" },
  { value: 1700000, name: "주차요금" },
  { value: 1100000, name: "통행료" },
];

const outOption = [
  { value: 2000000, name: "교통비" },
  { value: 2400000, name: "숙박비" },
  { value: 1550000, name: "식비" },
];

const advOption = [
  { value: 3000000, name: "온라인 광고비" },
  { value: 4400000, name: "오프라인 광고비" },
  { value: 1950000, name: "프로모션 및 이벤트비" },
];

//line
const peoLine = [
  {
    name: "급여",
    type: "line",
    data: [1332000000, 1230754600, 985643291, 1754632590, 875426932, 985641200],
  },
  {
    name: "4대 보험",
    type: "line",
    data: [119880000, 102354587, 123602450, 98754260, 124503500, 132546000],
  },
  {
    name: "식대",
    type: "line",
    data: [2010580, 2214560, 1987560, 2410320, 1245030, 2834780],
  },

  {
    name: "월급",
    type: "line",
    data: [1332000000, 1332450000, 1331867000, 1454900000, 1331900000, 1002400000],
  },
  {
    name: "기타 인건비1",
    type: "line",
    data: [2000000, 1998500, 2001400, 2505100, 2003200, 1997800],
  },
];

const carLine = [
  {
    name: "보험료",
    type: "line",
    data: [5000000, 5500000, 4800000, 5200000, 4900000, 5300000],
  },
  {
    name: "수리비",
    type: "line",
    data: [2000000, 1800000, 2200000, 1900000, 2100000, 2300000],
  },
  {
    name: "주차요금",
    type: "line",
    data: [1500000, 1600000, 1700000, 1800000, 1650000, 1550000],
  },
  {
    name: "통행료",
    type: "line",
    data: [1000000, 1200000, 1100000, 1050000, 1250000, 1150000],
  },
];

const outLine = [
  {
    name: "교통비",
    type: "line",
    data: [2000000, 2100000, 1900000, 2200000, 2050000, 2150000],
  },
  {
    name: "숙박비",
    type: "line",
    data: [2500000, 2400000, 2600000, 2450000, 2550000, 2350000],
  },
  {
    name: "식비",
    type: "line",
    data: [1500000, 1450000, 1550000, 1600000, 1400000, 1650000],
  },
];

const advLine = [
  {
    name: "온라인 광고비",
    type: "line",
    data: [3000000, 3100000, 2900000, 3200000, 3050000, 3150000],
  },
  {
    name: "오프라인 광고비",
    type: "line",
    data: [4500000, 4400000, 4600000, 4450000, 4550000, 4350000],
  },
  {
    name: "프로모션 및 이벤트비",
    type: "line",
    data: [2000000, 2050000, 1950000, 2100000, 1900000, 2150000],
  },
];

export {
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
};
