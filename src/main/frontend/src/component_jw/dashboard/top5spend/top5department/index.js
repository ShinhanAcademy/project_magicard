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
import SoftProgress from "components/SoftProgress";

function Top5Department() {
  const [data, setData] = useState({
    columns: [
      { name: "순위", align: "center" },
      { name: "부서", align: "center" },
      { name: "지출", align: "center" },
      { name: "사내 지출 비중", align: "center" }
    ],
    rows: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/dashboard/top5/department');
        setData((prevState) => ({
          ...prevState,
          rows: response.data.map((item, index) => ({
            순위: <SoftTypography variant="caption" color="text" fontWeight="medium">{index + 1}</SoftTypography>,
            부서: <SoftTypography variant="caption" color="text" fontWeight="medium">{item.departmentName}</SoftTypography>,
            지출: <SoftTypography variant="caption" color="text" fontWeight="medium">
                    {new Intl.NumberFormat('ko-KR', {
                      style: 'currency',
                      currency: 'KRW'
                    }).format(item.totalPayAmount)}
                  </SoftTypography>,
            "사내 지출 비중": <SoftBox width="6rem" textAlign="left">
                              <SoftProgress value={item.departmentSpendRatio} color="info" variant="gradient" label={false} />
                            </SoftBox>
          }))
        }));
      } catch (error) {
        console.error("Top 5 departments data fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return <Table columns={data.columns} rows={data.rows} />;
}

export default Top5Department;
