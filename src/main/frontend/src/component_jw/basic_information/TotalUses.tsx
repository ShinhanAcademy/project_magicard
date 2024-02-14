import MiniStatisticsCard from '../../examples/Cards/StatisticsCards/MiniStatisticsCard';
import React from 'react';

function TotalUses(props:any) {

    

    return (
        <MiniStatisticsCard
                title={{ text: "총 사용 건수" }}
                count="10,428"
                percentage={{ color: "success", text: "+3%" }}
                icon={{
                  color: "info",
                  component: "shopping_cart",
                }}
              />
    );
}

export default TotalUses;