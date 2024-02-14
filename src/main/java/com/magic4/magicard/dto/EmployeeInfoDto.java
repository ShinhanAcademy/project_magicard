package com.magic4.magicard.dto;

import com.magic4.magicard.vo.Company;
import com.magic4.magicard.vo.Department;
import com.magic4.magicard.vo.EmployeeRank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
public class EmployeeInfoDto {

    // 직원 관리 리스트 정보

    private String employeeEmail;

    private String employeeName;

    private String phone;
    
    private String employeeCode;    // 사번

    private EmployeeRank employeeRank;

    private Timestamp hireDate;

    private String authority;   // 권한

    private Department department;

    private Department superDepartment;

    private Company company;
}
