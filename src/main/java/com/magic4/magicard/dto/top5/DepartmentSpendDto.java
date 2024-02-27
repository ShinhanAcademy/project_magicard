package com.magic4.magicard.dto.top5;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DepartmentSpendDto {

    private String departmentName;
    private Integer totalPayAmount;
    private Double departmentSpendRatio;
    private List<DepartmentSpendDto> departmentSpendDtoList;
}
