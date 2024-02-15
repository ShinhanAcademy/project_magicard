import React, { useState } from "react";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import ChartByDepartment from "./ChartByDepartment";
import ChartByDepartment2 from "./ChartByDepartment2";
import ChartByDepartment3 from "./ChartByDepartment3";
import '../static/css/Selector.css';

interface SelectOptionProps {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function BarChart(props: any) { // 여기서 props의 타입을 any 대신 더 구체적으로 정의할 수 있습니다.
  const [select, setSelect] = useState<number>(1); // 상태의 타입을 number로 명시
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => { // 이벤트 객체의 타입을 명시
    console.log(e.target.value);
    setSelect(parseInt(e.target.value, 10)); // e.target.value는 string이므로 number로 변환
  };
  return (
  <Card >
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SelectOption onChange={onChange} ></SelectOption>
      </Grid> 
      <Grid item xs={12}>
        {select === 1 ? <ChartByDepartment /> 
          : select === 2 ? <ChartByDepartment2 /> 
          : <ChartByDepartment3 />}
      </Grid>
    </Grid>
  </Card>
  );
}
function dept1() {
    return <ChartByDepartment/>;
}
function dept2() {
    return <ChartByDepartment2/>;
}
function dept3() {    
    return <ChartByDepartment3/>;
}
function SelectOption({ onChange }:SelectOptionProps) {
    return (
      <Grid container justifyContent="flex-end" alignItems="center" >
      <Grid item lg={2} >
        <select onChange={onChange} className="custom-select">
          <option value={1}>경영전략본부</option>
          <option value={2}>디지털본부</option>
          <option value={3}>인사팀</option>
        </select>
        </Grid>
        </Grid>
    
    );
}


export default BarChart;