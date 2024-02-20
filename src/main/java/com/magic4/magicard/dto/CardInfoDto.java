package com.magic4.magicard.dto;

import com.magic4.magicard.vo.CardBenefit;
import com.magic4.magicard.vo.CardType;
import com.magic4.magicard.vo.IssuedCardBenefit;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
public class CardInfoDto {

    private UUID issuedCardId;
    private String CardCode;
    private String CardName;
    private int minimumAmount;
    private String cardNumber;
    private int cardCvc;
    private Timestamp expireDate;
    private String status;
    private int maximumAmount;
    private List<IssuedCardBenefit> cardBenefit;
}
