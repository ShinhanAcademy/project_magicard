package com.magic4.magicard.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApprovalStepsDto {
    private Integer approvalStatusCode;
    private String approvalStep;
}
