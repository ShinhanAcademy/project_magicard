package com.magic4.magicard.controller;

import java.util.*;

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

  CompanyDto companyDto = CompanyDto.builder().companyName("신한DS").companyTicker("SHDS").build();
  EmployeeDto employeeInfo = EmployeeDto.builder()
          .employeeEmail("aa4@naver.com")
          .employeeName("정주영")
          .phone("33333333333333")
          .company(companyDto)
          .build();

  @GetMapping("/getList")
  public List<PaymentInfoDto> getPaymentInfoList(HttpSession session) {
      return paymentInfoService.getPaymentInfoList(employeeInfo);
  }

  @GetMapping("/getTotalAmount")
  public int getTotalAmount(HttpSession session) {
    return paymentInfoService.getTotalAmount(employeeInfo);
  }
  
}
