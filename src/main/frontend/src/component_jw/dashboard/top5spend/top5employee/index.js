import React, { useState, useEffect } from "react";
import axios from "axios";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard Material-UI example components
import Table from "examples/Tables/Table";

function Top5employee() {
  // 상태 초기화
  const [data, setData] = useState({
    columns: [],
    rows: []
  });

  useEffect(() => {
    // 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        const response = await axios.get('/dashboard/top5/employee');
        // 서버 응답으로부터 받은 데이터로 상태 업데이트
        setData({
          columns: [
            { name: "순위", align: "center" },
            { name: "이름", align: "center" },
            { name: "소속", align: "center" },
            { name: "지출", align: "center" }
          ],
          rows: response.data.map((item, index) => ({
            순위: index + 1,
            이름: item.employeeName,
            소속: item.departmentName,
            지출: new Intl.NumberFormat('ko-KR', {
              style: 'currency',
              currency: 'KRW'
            }).format(item.totalPayAmount)
          }))
        });
      } catch (error) {
        console.error("Top 5 employees data fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Table columns={data.columns} rows={data.rows} />
  );
}

export default Top5employee;
