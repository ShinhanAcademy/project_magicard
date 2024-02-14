package com.magic4.magicard.dto;

import com.magic4.magicard.vo.PurposeCategory;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PurposeItemDto {
    private int purposeItemId;
    private PurposeCategory purposeCategory;
    private String purposeItem;
}
