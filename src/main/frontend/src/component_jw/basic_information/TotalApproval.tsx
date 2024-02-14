import MiniStatisticsCard from '../../examples/Cards/StatisticsCards/MiniStatisticsCard';
import React from 'react';

function Totalapproval(props:any) {

    

    return (
        <MiniStatisticsCard
                title={{ text: "총 승인 금액 " }}
                count="₩ 202,103,430"
                percentage={{ color: "success", text: "+5%" }}
                icon={{ color: "info", component: "paid" }}
              />
    );
}

export default Totalapproval;