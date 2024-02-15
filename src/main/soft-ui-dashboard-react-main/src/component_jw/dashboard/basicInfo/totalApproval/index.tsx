import MiniStatisticsCard from '../../../../examples/Cards/StatisticsCards/MiniStatisticsCard';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function TotalApproval(props:String) {

    
    const [totalApproval, setTotalApproval] = useState(0);

    useEffect(() => {
      // 데이터를 가져오는 함수
      const fetchTotalApproval = async () => {
        try {
          const response = await axios.get('/dashboard/totalApproval');
          setTotalApproval(response.data); // 응답 데이터로 상태 업데이트
        } catch (error) {
          console.error("승인 금액을 가져오는데 실패했습니다:", error);
        }
      };
    
      fetchTotalApproval(); // 컴포넌트 마운트 시 함수 실행
    }, []); // 빈 의존성 배열로 마운트
    
    // 숫자를 세 자리마다 콤마가 들어가는 문자열로 포맷팅
    const formattedTotalApproval = new Intl.NumberFormat('ko-KR').format(totalApproval);
    return (
        <MiniStatisticsCard
                title={{ text: "총 승인 금액 " }}
                count={formattedTotalApproval}
                percentage={{ color: "success", text: "+5%" }}
                icon={{ color: "success", component: "paid" }}
              />
    );
}

export default TotalApproval;