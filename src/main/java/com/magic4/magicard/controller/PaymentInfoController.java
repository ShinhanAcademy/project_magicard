package com.magic4.magicard.controller;

import java.util.*;

import com.magic4.magicard.dto.LoginResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.magic4.magicard.dto.CompanyDto;
import com.magic4.magicard.dto.EmployeeDto;
import com.magic4.magicard.dto.PaymentInfoDto;
import com.magic4.magicard.service.PaymentInfoService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequiredArgsConstructor
@RequestMapping("/paymentInfo")
public class PaymentInfoController {
  private final PaymentInfoService paymentInfoService;

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
  @GetMapping("/getList")
  public List<PaymentInfoDto> getPaymentInfoList(HttpServletRequest httpServletRequest) {
    EmployeeDto myInfo = getLoginInfo(httpServletRequest);
      return paymentInfoService.getPaymentInfoList(myInfo);
  }

  @GetMapping("/getTotalAmount")
  public int getTotalAmount(HttpServletRequest httpServletRequest) {
    EmployeeDto myInfo = getLoginInfo(httpServletRequest);
    return paymentInfoService.getTotalAmount(myInfo);
  }
  
}
