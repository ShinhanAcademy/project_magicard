import axios from 'axios';
import MiniStatisticsCard from '../../../../examples/Cards/StatisticsCards/MiniStatisticsCard';
import React, { useEffect, useState } from 'react';

function TotalUses(props) {

    
// 카드 수를 저장할 상태
const [totalUses, setTotalUses] = useState(0);

useEffect(() => {
  // 데이터를 가져오는 함수
  const fetchTotalUses = async () => {
    try {
      const response = await axios.get('/dashboard/totalUses');
      setTotalUses(response.data); // 응답 데이터로 상태 업데이트
    } catch (error) {
      console.error("사용 횟수를 가져오는데 실패했습니다:", error);
    }
  };

  fetchTotalUses(); // 컴포넌트 마운트 시 함수 실행
}, []); // 빈 의존성 배열로 마운트
    return (
        <MiniStatisticsCard
                title={{ text: "총 사용 건수" }}
                
                count={totalUses.toString()}
                unit="건"
                // percentage={{ color: "success", text: "+3%" }}
                icon={{
                  color: "success",
                  component: "shopping_cart",
                }}
              />
    );
}

export default TotalUses;