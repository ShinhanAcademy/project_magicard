import React, { useState } from "react";
import ChartMonthly from "./ChartMonthly";
import ChartQuarterly from "./ChartQuarterly";
import ChartYearly from "./ChartYearly";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import '../static/css/Selector.css';

interface SelectOptionProps {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}



function LineChart(props: any) { // 여기서 props의 타입을 any 대신 더 구체적으로 정의할 수 있습니다.
  const [select, setSelect] = useState<number>(1); // 상태의 타입을 number로 명시
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => { // 이벤트 객체의 타입을 명시
    console.log(e.target.value);
    setSelect(parseInt(e.target.value, 10)); // e.target.value는 string이므로 number로 변환
  };
  return (
    <Card style={{ margin: 'auto', maxWidth: '1500px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SelectOption onChange={onChange} />
        </Grid>
        <Grid item xs={12}>
          {select === 1 ? <Monthly /> : select === 2 ? <Quarterly /> : <Yearly />}
        </Grid>
      </Grid>
    </Card>
  );
}
function Quarterly() {
    return <ChartQuarterly/>;
}
function Yearly() {
    return <ChartYearly/>;
}
function Monthly() {    
    return <ChartMonthly/>;
}
function SelectOption({ onChange }:SelectOptionProps) {
    return (
  <Grid container justifyContent="right" alignItems="right">
    <Grid item xs={12}  lg={2}>
      <select onChange={onChange} className="custom-select">
        <option value={1}>월별</option>
        <option value={2}>분기별</option>
        <option value={3}>연도별</option>
      </select>
    </Grid>
  </Grid>
    );
}


export default LineChart;