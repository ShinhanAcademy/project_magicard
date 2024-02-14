package com.magic4.magicard.dto;

import lombok.*;

import java.sql.Timestamp;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class IssuedCardDto {
    private UUID issuedCardId;
    private CardTypeDto cardType;
    private String cardNumber;
    private int cardCvc;
    private Timestamp expireDate;
    private String status;
    private int maximunAmount;
    private EmployeeDto employee;

}
