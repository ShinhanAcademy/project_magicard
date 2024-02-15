import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MiniStatisticsCard from '../../../../examples/Cards/StatisticsCards/MiniStatisticsCard';


function TotalCards(props:String) {
  // 카드 수를 저장할 상태
  const [totalCards, setTotalCards] = useState(0);

  useEffect(() => {
    // 데이터를 가져오는 함수
    const fetchTotalCards = async () => {
      try {
        const response = await axios.get('/dashboard/totalCards');
        setTotalCards(response.data); // 응답 데이터로 상태 업데이트
      } catch (error) {
        console.error("카드 수를 가져오는데 실패했습니다:", error);
      }
    };

    fetchTotalCards(); // 컴포넌트 마운트 시 함수 실행
  }, []); // 빈 의존성 배열로 마운트

    return (
        <MiniStatisticsCard
        title={{ text: "총 카드 수 " }}
        count={totalCards.toString()} // 문자열로 변환하여 전달
        percentage={{ color: "success", text: "+55%" }}
        icon={{ color: "success", component: "public" }}
      />
    );
}

export default TotalCards;