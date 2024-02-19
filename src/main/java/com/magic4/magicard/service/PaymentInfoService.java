package com.magic4.magicard.service;

import java.util.*;

import com.magic4.magicard.dto.EmployeeEmailDto;
import com.magic4.magicard.repository.EmployeeRepo;
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
  private final EmployeeRepo employeeRepo;
  private ModelMapper model = new ModelMapper();
  public List<PaymentInfoDto> getPaymentInfoList(EmployeeDto employeeDto) {
    Employee employee = employeeRepo.findById(employeeDto.getEmployeeEmail()).orElse(null);

    IssuedCard issuedCard = issuedCardRepo.findByEmployee(employee);
    List<PaymentInfo> paymentInfoList = paymentInfoRepo.findByIssuedCardOrderByPaymentTimeDesc(issuedCard);

    List<PaymentInfoDto> paymentInfoDtoList = new ArrayList<>();

    for(PaymentInfo paymentInfo : paymentInfoList){
      PaymentInfoDto paymentInfoDto = model.map(paymentInfo, PaymentInfoDto.class);

      // issuedCardDto set
      IssuedCardDto issuedCardDto = model.map(issuedCard, IssuedCardDto.class);
      paymentInfoDto.setIssuedCard(issuedCardDto);

      List<Request> request = requestRepo.findByPaymentInfo(paymentInfo);

      if(request.size() == 0){
        // 신청 자체가 없으면
        paymentInfoDto.setFirstStepStatus("");
        paymentInfoDto.setSecondStepStatus("");
        paymentInfoDto.setSendRequest("신청");
      } else if(request.size() == 1){ // 1단계만 있을 경우
        int firstStep = request.get(0).getApprovalSteps().getApprovalStatusCode();
        paymentInfoDto.setFirstStepStatus(request.get(0).getApprovalSteps().getApprovalStep());
        paymentInfoDto.setSecondStepStatus("");

        if(firstStep == 1 || firstStep == 4){ // 승인 대기중, 반려
          paymentInfoDto.setSendRequest("수정");
        } else if(firstStep == 2|| firstStep == 5){ // 승인, 최종 반려
          paymentInfoDto.setSendRequest("조회");
        }
      } else { // 2단계 신청도 들어간 경우
        int firstStep = request.get(0).getApprovalSteps().getApprovalStatusCode();
        int secondStep = request.get(1).getApprovalSteps().getApprovalStatusCode();
        paymentInfoDto.setFirstStepStatus(request.get(0).getApprovalSteps().getApprovalStep());
        paymentInfoDto.setSecondStepStatus(request.get(1).getApprovalSteps().getApprovalStep());
        // 2단계 신청에서는 내가 수정할 필요는 없,,다!
        paymentInfoDto.setSendRequest("조회");
//        if(secondStep == 1 || secondStep == 4){ // 2단계 승인 대기중, 반려
//          paymentInfoDto.setSendRequest("수정");
//        } else if(secondStep == 2 || secondStep == 3 || secondStep == 5){ // 최종 승인, 최종 반려
//          paymentInfoDto.setSendRequest("조회");
//        }

      }
      paymentInfoDtoList.add(paymentInfoDto);
    }
    return paymentInfoDtoList;
  }


  public int getTotalAmount(EmployeeDto employeeDto) {
    int totalAmount = 0;
    Employee employee = employeeRepo.findById(employeeDto.getEmployeeEmail()).orElse(null);
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
