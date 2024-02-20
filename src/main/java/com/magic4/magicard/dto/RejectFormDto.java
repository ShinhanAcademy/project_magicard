package com.magic4.magicard.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RejectFormDto {
    private int requestId;
    private String refuseMessage;
}
