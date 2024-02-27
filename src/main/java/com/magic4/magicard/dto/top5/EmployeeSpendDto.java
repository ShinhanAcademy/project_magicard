package com.magic4.magicard.dto.top5;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeSpendDto {
    private String employeeName;
    private String departmentName;
    private Integer  totalPayAmount;
    private List<EmployeeSpendDto> employeeSpendDtoList;
}
