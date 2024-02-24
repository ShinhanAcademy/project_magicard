package com.magic4.magicard.controller;

import java.util.*;

import com.magic4.magicard.dto.*;
import com.magic4.magicard.repository.RequestRepo;
import com.magic4.magicard.service.EmployeeService;
import com.magic4.magicard.service.RequestService;

import com.magic4.magicard.vo.PaymentInfo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.web.bind.annotation.*;

import com.magic4.magicard.vo.Request;

import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
@RequestMapping("/requests")
public class RequestController {
    private final RequestService requestService;

    @Autowired
    RequestRepo requestRepo;
   

    public EmployeeDto getLoginInfo(HttpServletRequest httpServletRequest){
        HttpSession session = httpServletRequest.getSession();

        if (session == null || !httpServletRequest.isRequestedSessionIdValid()) {
            System.out.println("세션이 무효화 상태입니다.");
        }

        System.out.println(session.getAttribute("myInfo"));
        if (session.getAttribute("myInfo")==null){
            return null;
        } else {
            LoginResponseDto loginEmp=(LoginResponseDto) session.getAttribute("myInfo");
            EmployeeDto employeeDto = EmployeeDto.builder()
                    .employeeEmail(loginEmp.getEmployeeEmail())
                    .employeeName(loginEmp.getEmployeeName())
                    .build();
            return employeeDto;
        }
    }

    

    @GetMapping("/fromMe/getRequestList")
    public List<RequestDto> getFromMeRequestList(HttpServletRequest httpServletRequest) {
        EmployeeDto myInfo = getLoginInfo(httpServletRequest);
        return requestService.getRequestList(myInfo);
    }

    @GetMapping("/fromMe/getApproveList")
    public List<RequestDto> getFromMeApproveList(HttpServletRequest httpServletRequest) {
        EmployeeDto myInfo = getLoginInfo(httpServletRequest);
        return requestService.getApproveList(myInfo);
    }

    @GetMapping("/fromMe/getRefuseList")
    public List<RequestDto> getFromMeRefuseList(HttpServletRequest httpServletRequest) {
        EmployeeDto myInfo = getLoginInfo(httpServletRequest);
        return requestService.getRefuseList(myInfo);
    }

    @GetMapping("/toMe/getList")
    public List<RequestDto> getToMeRequestList(HttpServletRequest httpServletRequest) {
        EmployeeDto myInfo = getLoginInfo(httpServletRequest);
        return requestService.getToMeRequestList(myInfo);
    }

    @GetMapping("/toMe/getCount")
    public Integer getToMeRequestCount(HttpServletRequest httpServletRequest){
        EmployeeDto myInfo = getLoginInfo(httpServletRequest);
        return requestService.getToMeRequestCount(myInfo);
    }

    @GetMapping("/toMe/getRequestList")
    public List<RequestDto> getToTopRequestList(HttpServletRequest httpServletRequest) {
        EmployeeDto myInfo = getLoginInfo(httpServletRequest);
        return requestService.getToTopRequestList(myInfo);
    }

    @GetMapping("/toMe/getApproveList")
    public List<RequestDto> getToMeApproveList(HttpServletRequest httpServletRequest) {
        EmployeeDto myInfo = getLoginInfo(httpServletRequest);
        return requestService.getToTopApproveList(myInfo);
    }

    @GetMapping("/toMe/getRefuseList")
    public List<RequestDto> getToMeRefuseList(HttpServletRequest httpServletRequest) {
        EmployeeDto myInfo = getLoginInfo(httpServletRequest);
        return requestService.getToTopRefuseList(myInfo);
    }

    @GetMapping("/paymentInfo/{paymentId}")
    public PaymentInfoDto getPaymentInfo(@PathVariable Integer paymentId){
        return requestService.getPaymentInfo(paymentId);
    }

    @PostMapping("/sendRequest")
    public Integer sendRequest(@RequestBody RequestFormDto requestFormDto, HttpServletRequest httpServletRequest){
        EmployeeDto myInfo = getLoginInfo(httpServletRequest);
        return requestService.sendRequest(requestFormDto, myInfo);
    }

    @GetMapping("/requestInfo/{paymentId}")
    public RequestDto getRequestInfo(@PathVariable Integer paymentId){
        return requestService.getRequestInfo(paymentId);
    }

    @GetMapping("/requestInfo/bySelectedId/{requestId}")
    public RequestDto getRequestInfoByRequestId(@PathVariable Integer requestId){
        return requestService.getRequestInfoByRequestId(requestId);
    }

    @PostMapping("/updateRequest")
    public Integer updateRequest(@RequestBody RequestFormDto requestFormDto, HttpServletRequest httpServletRequest){
        EmployeeDto myInfo = getLoginInfo(httpServletRequest);
        return requestService.updateRequest(requestFormDto, myInfo);
    }

    @PostMapping("/sendToFinanceDept")
    public Integer confirmRequest(@RequestBody RequestFormDto requestFormDto, HttpServletRequest httpServletRequest){
        EmployeeDto myInfo = getLoginInfo(httpServletRequest);
        return requestService.confirmRequest(requestFormDto, myInfo);
    }

    @PostMapping("/refuseRequest")
    public Integer refuseRequest(@RequestBody RejectFormDto rejectFormDto){
        return requestService.refuseRequest(rejectFormDto);
    }

    @GetMapping("/approvalRequest")
    public List<Map<String, Object>> findRequestNumWhereApprovalFinal() {
        return requestRepo.findRequestNumWhereApprovalFinal();
    }
    
}
