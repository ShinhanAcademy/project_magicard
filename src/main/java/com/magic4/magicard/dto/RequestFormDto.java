package com.magic4.magicard.dto;

import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RequestFormDto {
    private int paymentId;
    private String participant;
    private int purposeItemUid;
    private String receiptUrl;
}
