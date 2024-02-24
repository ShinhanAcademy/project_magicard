import MiniStatisticsCard from '../../../../examples/Cards/StatisticsCards/MiniStatisticsCard';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function TotalPayment(props) {

const [totalPayment, setTotalPayment] = useState(0);

useEffect(() => {
  // 데이터를 가져오는 함수
  const fetchTotalPayment = async () => {
    try {
      const response = await axios.get('/dashboard/totalPayment');
      setTotalPayment(response.data); // 응답 데이터로 상태 업데이트
    } catch (error) {
      console.error("사용 금액을 가져오는데 실패했습니다:", error);
    }
  };

  fetchTotalPayment(); // 컴포넌트 마운트 시 함수 실행
}, []); // 빈 의존성 배열로 마운트


const formattedTotalPayment = new Intl.NumberFormat('ko-KR').format(totalPayment);
    return (
        <MiniStatisticsCard
                title={{ text: "총 사용 금액" }}
                count={formattedTotalPayment}
                unit="원"
                // percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "success", component: "paid" }}
              />
    );
}

export default TotalPayment;