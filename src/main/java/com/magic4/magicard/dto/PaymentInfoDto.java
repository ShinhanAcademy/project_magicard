package com.magic4.magicard.dto;

import com.magic4.magicard.vo.IssuedCard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentInfoDto {
    private int paymentId;
    private IssuedCardDto issuedCard;
    private int payAmount;
    private String merchant;
    private Timestamp paymentTime;
    private String firstStepStatus; // 1단계 => 승인 대기중, 승인, 반려, 최종 반려
    private String secondStepStatus; // 2단계  => 승인 대기중, 승인, 반려, 최종 반려, 최종 승인
    private String sendRequest; // 신청, 요청

    private Integer totalPayAmount;
}
