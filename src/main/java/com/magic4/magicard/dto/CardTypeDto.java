package com.magic4.magicard.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class CardTypeDto {
    private String cardCode;

    private String cardName;
    private int minimumAmount;

}
