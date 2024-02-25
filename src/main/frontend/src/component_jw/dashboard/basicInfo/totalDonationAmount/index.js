import MiniStatisticsCard from '../../../../examples/Cards/StatisticsCards/MiniStatisticsCard';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function TotalDonationAmount(props) {

    
    const [totalDonationAmount, setTotalDonationAmount] = useState(0);

    useEffect(() => {
      // 데이터를 가져오는 함수
      const fetchTotalDonationAmount = async () => {
        try {
          const response = await axios.get('/dashboard/totalDonationAmount');
          setTotalDonationAmount(response.data); // 응답 데이터로 상태 업데이트
        } catch (error) {
          console.error("누적 기부 금액을 가져오는데 실패했습니다:", error);
        }
      };
    
      fetchTotalDonationAmount(); // 컴포넌트 마운트 시 함수 실행
    }, []); // 빈 의존성 배열로 마운트
    
    // 숫자를 세 자리마다 콤마가 들어가는 문자열로 포맷팅
    const formattedTotalDonationAmount = new Intl.NumberFormat('ko-KR').format(totalDonationAmount);
    return (
        <MiniStatisticsCard
                title={{ text: "누적 기부 금액 " }}
                count={formattedTotalDonationAmount}
                unit="원"
                // percentage={{ color: "success", text: "+5%" }}
                icon={{ color: "success", component: "paid" }}
              />
    );
}

export default TotalDonationAmount;