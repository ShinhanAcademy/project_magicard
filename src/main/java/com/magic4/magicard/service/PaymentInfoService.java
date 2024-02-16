package com.magic4.magicard.service;

import java.util.*;

import com.magic4.magicard.dto.EmployeeEmailDto;
import com.magic4.magicard.vo.Employee;
import com.magic4.magicard.vo.IssuedCard;
import com.magic4.magicard.vo.PaymentInfo;
import com.magic4.magicard.vo.Request;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.magic4.magicard.repository.RequestRepo;
import com.magic4.magicard.dto.EmployeeDto;
import com.magic4.magicard.dto.IssuedCardDto;
import com.magic4.magicard.dto.PaymentInfoDto;
import com.magic4.magicard.repository.IssuedCardRepo;
import com.magic4.magicard.repository.PaymentInfoRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentInfoService {
  private final IssuedCardRepo issuedCardRepo;
  private final PaymentInfoRepo paymentInfoRepo;
  private final RequestRepo requestRepo;
  private ModelMapper model = new ModelMapper();
  public List<PaymentInfoDto> getPaymentInfoList(EmployeeDto employeeDto) {
    Employee employee = model.map(employeeDto, Employee.class);
    IssuedCard issuedCard = issuedCardRepo.findByEmployee(employee);
    List<PaymentInfo> paymentInfoList = paymentInfoRepo.findByIssuedCardOrderByPaymentTimeDesc(issuedCard);

    List<PaymentInfoDto> paymentInfoDtoList = new ArrayList<>();

    for(PaymentInfo paymentInfo : paymentInfoList){
      PaymentInfoDto paymentInfoDto = model.map(paymentInfo, PaymentInfoDto.class);

      // issuedCardDto set
      IssuedCardDto issuedCardDto = model.map(issuedCard, IssuedCardDto.class);
      paymentInfoDto.setIssuedCard(issuedCardDto);

      // firstStepStatus set
      // secondStepStatus set
      // sendRequest set

      List<Request> request = requestRepo.findByPaymentInfo(paymentInfo);

      System.out.println(request.size());

      if(request.size() == 0){
        // 신청 자체가 없으면
        paymentInfoDto.setFirstStepStatus("");
        paymentInfoDto.setSecondStepStatus("");
        paymentInfoDto.setSendRequest("신청");
      }else {
        paymentInfoDto.setFirstStepStatus(request.get(0).getApprovalSteps().getApprovalStep());
        if(request.size() == 1){
          // 1단계 신청만 되었으면
          paymentInfoDto.setSecondStepStatus("");
        }else {
          // 2단계 현황
          paymentInfoDto.setSecondStepStatus(request.get(1).getApprovalSteps().getApprovalStep());
          // 신청, 재요청, block
//          Integer step1 = request.get(0).getApprovalSteps().getApprovalStatusCode();
//          Integer step2 = request.get(1).getApprovalSteps().getApprovalStatusCode();
          paymentInfoDto.setSendRequest("확인");
        }
      }
      paymentInfoDtoList.add(paymentInfoDto);
    }
    return paymentInfoDtoList;
  }


  public int getTotalAmount(EmployeeDto employeeDto) {
    int totalAmount = 0;
    Employee employee = model.map(employeeDto, Employee.class);
    IssuedCard issuedCard = issuedCardRepo.findByEmployee(employee);
    List<PaymentInfo> paymentInfoList = paymentInfoRepo.findByIssuedCardAndThisMonth(issuedCard);

    for(PaymentInfo p : paymentInfoList){
      int price = p.getPayAmount();
      totalAmount += price;
    }

    return totalAmount;
  }

  public Long selectTotalUses(EmployeeEmailDto employeeEmailDto){
   return paymentInfoRepo.totalUses(changeDtoToEntity(employeeEmailDto).getEmployeeEmail());
  }

  public Long selectTotalPayment(EmployeeEmailDto employeeEmailDto) {
    return paymentInfoRepo.totalPayment(changeDtoToEntity(employeeEmailDto).getEmployeeEmail());
  }

  public Long selectTotalApproval(EmployeeEmailDto employeeEmailDto) {
    return paymentInfoRepo.totalApproval(changeDtoToEntity(employeeEmailDto).getEmployeeEmail());
  }
  private Employee changeDtoToEntity(EmployeeEmailDto employeeEmailDto) {
    return Employee.builder().employeeEmail(employeeEmailDto.getEmployeeEmail()).build();

  }
}
