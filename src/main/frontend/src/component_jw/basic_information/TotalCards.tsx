import MiniStatisticsCard from '../../examples/Cards/StatisticsCards/MiniStatisticsCard';
import React from 'react';

function TotalCards(props:any) {

    

    return (
        <MiniStatisticsCard
        title={{ text: "총 카드 수 " }}
        count=""
        percentage={{ color: "success", text: "+55%" }}
        icon={{ color: "info", component: "public" }}
      />
    );
}

export default TotalCards;