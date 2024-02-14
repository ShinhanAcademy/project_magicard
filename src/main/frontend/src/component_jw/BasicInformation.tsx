import React from 'react';

// Props 타입 정의
interface BasicInformationProps {
    totalCards: number;
    totalUses: number;
    totalSpent: number;
    totalApproval: number;
}

function BasicInformation({totalCards,totalUses,totalSpent,totalApproval}:BasicInformationProps) {
    
    return (
        <div className='basic-information'>   
            <span className='basic-information-items'>총 카드 수 : {totalCards} 개</span>
            <span className='basic-information-items'>총 사용 건수 : {totalUses} 건</span>
            <span className='basic-information-items'>총 사용 금액 : {totalSpent} 원</span>
            <span className='basic-information-items'>총 승인 금액 : {totalApproval} 원</span>
        </div>
    );
}

export default BasicInformation;