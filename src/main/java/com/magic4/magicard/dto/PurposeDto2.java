package com.magic4.magicard.dto;

import java.util.List;

import com.magic4.magicard.vo.PurposeCategory;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PurposeDto2 {
        private String purposeCategory;
        private List<String> purposeItem;
}