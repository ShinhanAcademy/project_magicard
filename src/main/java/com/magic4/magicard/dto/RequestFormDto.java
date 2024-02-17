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
    private int purposeItemUid;
    private String participant;
    private String receiptUrl;
    private String memo;
    private int requestLevel;
}
