package com.magic4.magicard.dto;

import com.magic4.magicard.vo.Company;
import com.magic4.magicard.vo.Department;
import com.magic4.magicard.vo.EmployeeRank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class LoginResponseDto {
    // 로그인 후 세션 또는 쿠키에 담을 직원 정보

    private String employeeEmail;

    private String employeeName;

    private String phone;

    private String employeeCode;

    private EmployeeRank employeeRank;

    private Department department;

    private Company company;
}
