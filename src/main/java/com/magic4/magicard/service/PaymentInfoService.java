package com.magic4.magicard.service;

import java.util.*;

import com.magic4.magicard.dto.EmployeeEmailDto;
import com.magic4.magicard.repository.EmployeeRepo;
import com.magic4.magicard.vo.*;
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
        for(Request req : request){
          if(req.getRequestLevel() == 1){
            ApprovalSteps firstStep = req.getApprovalSteps();
            paymentInfoDto.setFirstStepStatus(firstStep.getApprovalStep());
          }else if(req.getRequestLevel() == 2){
            ApprovalSteps secondStep = req.getApprovalSteps();
            paymentInfoDto.setSecondStepStatus(secondStep.getApprovalStep());
          }
        }
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

  public List<String> getTop5(EmployeeDto myInfo) {
    Employee employee = employeeRepo.findById(myInfo.getEmployeeEmail()).orElse(null);
    IssuedCard issuedCard = issuedCardRepo.findByEmployee(employee);
    List<PaymentInfo> paymentInfoList = paymentInfoRepo.findByIssuedCard(issuedCard);

    HashMap<String, Integer> findList = new HashMap<>();
    List<String> topList = new ArrayList<>();

    for(PaymentInfo paymentInfo : paymentInfoList){
        String merchant = paymentInfo.getMerchant();
        Integer payAmount = paymentInfo.getPayAmount();
        findList.put(merchant, findList.getOrDefault(merchant, 0) + payAmount);
    }

    List<Map.Entry<String, Integer>> useEntry = new ArrayList<>(findList.entrySet()); // hashmap 정렬하는 방법 공부하자
    useEntry.sort((o1, o2) -> o2.getValue().compareTo(o1.getValue()));

    for (int i = 0; i < Math.min(5, useEntry.size()); i++) {
      topList.add(useEntry.get(i).getKey());
    }

    return topList;
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

  public int getRequestInfoByRequestId(int paymentId) {
    PaymentInfo paymentInfo = paymentInfoRepo.findByPaymentId(paymentId);
    List<Request> request = requestRepo.findByPaymentInfo(paymentInfo);
    return request.get(0).getRequestID();
  }
}
