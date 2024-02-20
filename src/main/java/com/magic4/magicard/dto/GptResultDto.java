package com.magic4.magicard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GptResultDto {
    private String purposeCategory;
    private Integer purposeCategoryId;

    private String purposeItem;
    private Integer purposeItemUid;
}
