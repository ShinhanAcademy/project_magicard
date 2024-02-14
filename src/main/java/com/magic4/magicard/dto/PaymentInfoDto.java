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
    private String requestStatus;
    private String sendRequest;
}
