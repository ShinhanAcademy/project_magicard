package com.magic4.magicard.controller;

import com.magic4.magicard.dto.EmployeeInfoDto;
import com.magic4.magicard.dto.LoginResponseDto;
import com.magic4.magicard.service.EmployeeService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/emp")
public class EmployeeController {

    private final EmployeeService employeeService;

    // 회사의 전체 직원 조회
    @GetMapping("/list/all")
    public List<EmployeeInfoDto> getAllEmpList(HttpServletRequest httpServletRequest){

        HttpSession session = httpServletRequest.getSession();
        System.out.println("session"+session);
        if (session == null || !httpServletRequest.isRequestedSessionIdValid()) {
            System.out.println("세션이 무효화 상태입니다.");
        }

        System.out.println(session.getAttribute("myInfo"));

        if (session.getAttribute("myInfo")==null){
            return null;
        } else {
            LoginResponseDto loginEmp=(LoginResponseDto) session.getAttribute("myInfo");
            return employeeService.getAllEmpList(loginEmp.getCompany());
        }
    }

    // 회사의 특정 부서 소속 직원 조회
    @GetMapping("/list/dept/{deptId}")
    public List<EmployeeInfoDto> getEmpListByDept(@PathVariable("deptId") int deptId){
        return employeeService.getEmpListByDept(deptId);
    }

    // 회사의 특정 직급 직원 조회
    @GetMapping("/list/rank/{employeeRankId}")
    public List<EmployeeInfoDto> getEmpListByRank(@PathVariable("employeeRankId") int employeeRankId){
        return employeeService.getEmpListByRank(employeeRankId);
    }


    // 회사의 특정 권한 직원 조회
//    @GetMapping("/list/rank/{employeeRankId}")
//    public List<EmployeeInfoDto> getEmpListByRank(@PathVariable("employeeRankId") int employeeRankId){
//        return employeeService.getEmpListByRank(employeeRankId);
//    }
}
