package com.magic4.magicard.controller_sy;

import java.util.*;

import com.magic4.magicard.dto_sy.CompanyDto;
import com.magic4.magicard.dto_sy.EmployeeDto;
import com.magic4.magicard.dto_sy.PaymentInfoDto;
import com.magic4.magicard.dto_sy.RequestDto;
import com.magic4.magicard.service_sy.RequestService;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.magic4.magicard.vo.Request;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/requests")
public class RequestController {
    private final RequestService requestService;
    CompanyDto companyDto = CompanyDto.builder().companyName("신한DS").companyTicker("SHDS").build();
    EmployeeDto employeeInfo = EmployeeDto.builder()
            .employeeEmail("aa15@naver.com")
            .employeeName("박지원")
            .phone("01012344321")
            .company(companyDto)
            .build();

    @GetMapping("/fromMe/getRequestList")
    public List<RequestDto> getFromMeRequestList(HttpSession session) {
        return requestService.getRequestList(employeeInfo);
    }

    @GetMapping("/fromMe/getApproveList")
    public List<RequestDto> getFromMeApproveList(HttpSession session) {
        return requestService.getApproveList(employeeInfo);
    }

    @GetMapping("/fromMe/getRefuseList")
    public List<RequestDto> getFromMeRefuseList(HttpSession session) {
        return requestService.getRefuseList(employeeInfo);
    }

    @GetMapping("/toMe/getAllList")
    public List<RequestDto> getToMeRequestList(HttpSession session) {
        return requestService.getToMeRequestList(employeeInfo);
    }

    @GetMapping("/toMe/getApproveList")
    public List<RequestDto> getToMeApproveList(HttpSession session) {
        return requestService.getToMeApproveList(employeeInfo);
    }

    @GetMapping("/toMe/getRefuseList")
    public List<RequestDto> getToMeRefuseList(HttpSession session) {
        return requestService.getToMeRefuseList(employeeInfo);
    }



}
