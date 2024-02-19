package com.magic4.magicard.controller;

import java.util.*;

import com.magic4.magicard.dto.*;
import com.magic4.magicard.service.RequestService;

import com.magic4.magicard.vo.PaymentInfo;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

import com.magic4.magicard.vo.Request;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/requests")
public class RequestController {
    private final RequestService requestService;
    CompanyDto companyDto = CompanyDto.builder().companyName("신한DS").companyTicker("SHDS").build();
    EmployeeDto employeeInfo = EmployeeDto.builder()
            .employeeEmail("aa4@naver.com")
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

    @GetMapping("/toMe/getList")
    public List<RequestDto> getToMeRequestList(HttpSession session) {
        return requestService.getToMeRequestList(employeeInfo);
    }

    @GetMapping("/toMe/getRequestList")
    public List<RequestDto> getToTopRequestList(HttpSession session) {
        return requestService.getToTopRequestList(employeeInfo);
    }

    @GetMapping("/toMe/getApproveList")
    public List<RequestDto> getToMeApproveList(HttpSession session) {
        return requestService.getToMeApproveList(employeeInfo);
    }

    @GetMapping("/toMe/getRefuseList")
    public List<RequestDto> getToMeRefuseList(HttpSession session) {
        return requestService.getToMeRefuseList(employeeInfo);
    }

    @GetMapping("/paymentInfo/{paymentId}")
    public PaymentInfoDto getPaymentInfo(@PathVariable Integer paymentId){
        return requestService.getPaymentInfo(paymentId);
    }

    @PostMapping("/sendRequest")
    public Integer sendRequest(@RequestBody RequestFormDto requestFormDto){
        return requestService.sendRequest(requestFormDto, employeeInfo);
    }

    @GetMapping("/requestInfo/{paymentId}")
    public RequestDto getRequestInfo(@PathVariable Integer paymentId){
        return requestService.getRequestInfo(paymentId);
    }

    @PostMapping("/updateRequest")
    public Integer updateRequest(@RequestBody RequestFormDto requestFormDto){
        return requestService.updateRequest(requestFormDto, employeeInfo);
    }

    @PostMapping("/sendToFinanceDept")
    public Integer confirmRequest(@RequestBody RequestFormDto requestFormDto){
        return requestService.confirmRequest(requestFormDto, employeeInfo);
    }

}
