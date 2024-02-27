package com.magic4.magicard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDto {
    private String employeeEmail;
    private String employeeName;
    private String phone;
    private String userId;
    private EmployeeRankDto employeeRank;
    private DepartmentDto department;
    private CompanyDto company;
    private List<EmployeeDto> employeeDtoList;
}
