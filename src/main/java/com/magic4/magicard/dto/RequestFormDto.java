package com.magic4.magicard.dto;

import lombok.*;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RequestFormDto {
    private int requestId;
    private int paymentId;
    private int purposeItemUid;
    private String participant;
    private String receiptUrl;
    private String memo;
}
