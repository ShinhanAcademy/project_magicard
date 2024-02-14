import MiniStatisticsCard from '../../examples/Cards/StatisticsCards/MiniStatisticsCard';
import React from 'react';

function TotalPayment(props:any) {

    

    return (
        <MiniStatisticsCard
                title={{ text: "총 사용 금액" }}
                count="₩ 204,632,230"
                percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "info", component: "paid" }}
              />
    );
}

export default TotalPayment;