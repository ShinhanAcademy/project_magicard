package com.magic4.magicard.service;

import com.magic4.magicard.dto.EmployeeInfoDto;
import com.magic4.magicard.repository.CompanyRepo;
import com.magic4.magicard.repository.DepartmentRepo;
import com.magic4.magicard.repository.EmployeeRankRepo;
import com.magic4.magicard.repository.EmployeeRepo;
import com.magic4.magicard.vo.Company;
import com.magic4.magicard.vo.Employee;
import com.magic4.magicard.vo.EmployeeRank;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepo employeeRepo;
    private final EmployeeRankRepo employeeRankRepo;
    private final CompanyRepo companyRepo;
    private final DepartmentRepo departmentRepo;

    // 회사의 전체 직원 조회
    public List<EmployeeInfoDto> getAllEmpList(Company company){

        // 세션에 등록된 Company 정보로 회사의 직급들을 조회
        List<EmployeeRank> employeeRankList=employeeRankRepo.findEmployeeRanksByCompany(company);

        // 직급 id들에 해당하는 직원들 조회
        List<Employee> employees=employeeRepo.findAllByEmployeeRankIn(employeeRankList);

        return makeEmployeeInfoDtoList(employees, company);
    }

    // 회사의 특정 부서 소속 직원 조회
    public List<EmployeeInfoDto> getEmpListByDept(int departmentId){

        Company company= companyRepo.findById("SHDS").orElse(null);

        // 세션에 등록된 Company 정보로 회사의 직급들을 조회
        List<EmployeeRank> employeeRankList=employeeRankRepo.findEmployeeRanksByCompany(company);

        // 특정 부서에 해당하는 직원들 조회
        List<Employee> employees=employeeRepo.findAllByDepartmentAndEmployeeRankIn(departmentRepo.findById(departmentId).orElse(null), employeeRankList);

        return makeEmployeeInfoDtoList(employees, company);
    }
    
    public List<EmployeeInfoDto> getEmpListByRank(int employeeRankId){

        EmployeeRank employeeRank= employeeRankRepo.findById(employeeRankId).orElse(null);

        // 세션에 등록된 직급 정보에 해당하는 직원들 조회
        List<Employee> employees=employeeRepo.findAllByEmployeeRank(employeeRank);

        return makeEmployeeInfoDtoList(employees, employeeRank.getCompany());
    }

    // Employee 리스트 => EmployeeInfoDto 리스트 변환
    public List<EmployeeInfoDto> makeEmployeeInfoDtoList(List<Employee> employees, Company company){

        List<EmployeeInfoDto> employeeInfoList=new ArrayList<>();

        for (Employee employee:employees){
            String authority="";
            if (employee.getDepartment().isAdminDepartment()){
                authority="관리자";
            } else {
                authority="일반";
            }

            employeeInfoList.add(EmployeeInfoDto.builder()
                    .employeeEmail(employee.getEmployeeEmail())
                    .employeeCode(employee.getEmployeeCode())
                    .employeeName(employee.getEmployeeName())
                    .employeeRank(employee.getEmployeeRank())
                    .phone(employee.getPhone())
                    .company(company)
                    .department(employee.getDepartment())
                    .superDepartment(employee.getDepartment().getSuperDepartment())
                    .authority(authority)
                    .hireDate(employee.getHireDate())
                    .build());
        }

        return employeeInfoList;
    }


}
