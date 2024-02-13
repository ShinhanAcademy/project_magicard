package com.magic4.magicard.service_sy;

import java.util.*;

import com.magic4.magicard.dto_sy.IssuedCardDto;
import com.magic4.magicard.dto_sy.PaymentInfoDto;
import com.magic4.magicard.dto_sy.EmployeeDto;
import com.magic4.magicard.vo.Employee;
import com.magic4.magicard.vo.IssuedCard;
import com.magic4.magicard.vo.PaymentInfo;
import com.magic4.magicard.vo.Request;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.magic4.magicard.repository_sy.RequestRepo;
import com.magic4.magicard.repository_sy.IssuedCardRepo;
import com.magic4.magicard.repository_sy.PaymentInfoRepo;

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

      IssuedCardDto issuedCardDto = model.map(issuedCard, IssuedCardDto.class);
      paymentInfoDto.setIssuedCard(issuedCardDto);

      Request request = requestRepo.findByPaymentInfo(paymentInfo);
      if(request == null){
        paymentInfoDto.setRequestStatus("");
        paymentInfoDto.setSendRequest("요청");
      }else {
        Integer step = request.getApprovalSteps().getApprovalStatusCode();
        paymentInfoDto.setRequestStatus(request.getApprovalSteps().getApprovalStep());
        if(step == 1){
          paymentInfoDto.setSendRequest("신청");
        }else if(step == 2 || step == 4 || step == 5){
          paymentInfoDto.setSendRequest("요청 수정");
        }else if(step == 3 || step == 6) {
          paymentInfoDto.setSendRequest("승인 대기중");
        }else if(step == 7){
         paymentInfoDto.setSendRequest("최종 승인");
        }else if(step == 8){
          paymentInfoDto.setSendRequest("최종 반려");
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
}
