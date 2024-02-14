package com.magic4.magicard.service;

import com.magic4.magicard.dto.LoginRequestDto;
import com.magic4.magicard.dto.LoginResponseDto;
import com.magic4.magicard.repository.EmployeeRepo;
import com.magic4.magicard.vo.Employee;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final EmployeeRepo employeeRepo;

    public LoginResponseDto login(LoginRequestDto loginRequestDto){

        Employee employee=employeeRepo.findById(loginRequestDto.getEmployeeEmail()).orElse(null);

        return LoginResponseDto.builder()
                .employeeEmail(employee.getEmployeeEmail())
                .employeeName(employee.getEmployeeName())
                .employeeRank(employee.getEmployeeRank())
                .employeeCode(employee.getEmployeeCode())
                .phone(employee.getPhone())
                .company(employee.getEmployeeRank().getCompany())
                .department(employee.getDepartment())
                .build();
    }
}
