package com.magic4.magicard.service;

import com.magic4.magicard.dto.ApprovalStepsDto;
import com.magic4.magicard.dto.EmployeeDto;
import com.magic4.magicard.dto.PaymentInfoDto;
import com.magic4.magicard.dto.PurposeItemDto;
import com.magic4.magicard.dto.RequestDto;
import com.magic4.magicard.dto.*;
import com.magic4.magicard.repository.*;
import com.magic4.magicard.vo.*;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RequestService {
  private final RequestRepo requestRepo;
  private final ApprovalStepsRepo approvalStepsRepo;
  private final IssuedCardRepo issuedCardRepo;
  private final PaymentInfoRepo paymentInfoRepo;
  private final PurposeItemRepo purposeItemRepo;
  private ModelMapper model = new ModelMapper();

  // 전체 내가 신청 내역 가져오기
  public List<RequestDto> getRequestAll(EmployeeDto employeeDto){
    Employee employee = model.map(employeeDto, Employee.class);
    IssuedCard issuedCard = issuedCardRepo.findByEmployee(employee);
    List<PaymentInfo> paymentInfoList = paymentInfoRepo.findByIssuedCardOrderByPaymentTimeDesc(issuedCard);

    List<Request> requestList = new ArrayList<>();

    for(PaymentInfo paymentInfo : paymentInfoList){
      List<Request> request = requestRepo.findByPaymentInfo(paymentInfo);
//      if(request != null){
//        requestList.add(request);
//      }
    }

    List<RequestDto> requestDtoList = new ArrayList<>();

    for(Request request : requestList){
      RequestDto requestDto = model.map(request, RequestDto.class);
      requestDto.setEmployee(employeeDto);

      PaymentInfo paymentInfo = paymentInfoRepo.findById(request.getPaymentInfo().getPaymentId()).orElse(null);
      PaymentInfoDto paymentInfoDto = model.map(paymentInfo, PaymentInfoDto.class);
      requestDto.setPaymentInfo(paymentInfoDto);

      PurposeItem purposeItem = purposeItemRepo.findByPurposeItem(request.getPurposeItem().getPurposeItem());
      PurposeItemDto purposeItemDto = model.map(purposeItem, PurposeItemDto.class);
      requestDto.setPurposeItem(purposeItemDto);

      ApprovalSteps approvalSteps = approvalStepsRepo.findById(request.getApprovalSteps().getApprovalStatusCode()).orElse(null);
      ApprovalStepsDto approvalStepsDto = model.map(approvalSteps, ApprovalStepsDto.class);
      requestDto.setApprovalSteps(approvalStepsDto);

      Integer step = request.getApprovalSteps().getApprovalStatusCode();
      if(step == 1){
        requestDto.setSendRequest("신청");
      }else if(step == 2 || step == 4 || step == 5){
        requestDto.setSendRequest("요청 수정");
      }else if(step == 3 || step == 6) {
        requestDto.setSendRequest("승인 대기중");
      }else if(step == 7){
        requestDto.setSendRequest("최종 승인");
      }else if(step == 8){
        requestDto.setSendRequest("최종 반려");
      }
      requestDtoList.add(requestDto);
    }

    return requestDtoList;
  }

  public List<RequestDto> getRequestList(EmployeeDto employeeDto) {
    return getRequestAll(employeeDto);
  }

  public List<RequestDto> getApproveList(EmployeeDto employeeDto) {
    List<RequestDto> allRequest = getRequestAll(employeeDto);

    List<RequestDto> requestDtoList = new ArrayList<>();

    for(RequestDto requestDto : allRequest){
      if(requestDto.getApprovalSteps().getApprovalStatusCode() == 7){
        requestDtoList.add(requestDto);
      }
    }
    return requestDtoList;
  }

  public List<RequestDto> getRefuseList(EmployeeDto employeeDto) {
    List<RequestDto> allRequest = getRequestAll(employeeDto);

    List<RequestDto> requestDtoList = new ArrayList<>();

    for(RequestDto requestDto : allRequest){
      if(requestDto.getApprovalSteps().getApprovalStatusCode() == 8){
        requestDtoList.add(requestDto);
      }
    }
    return requestDtoList;
  }

  public List<RequestDto> getToMeRequestList(EmployeeDto employeeDto) {
    String responseEmployeeEmail = employeeDto.getEmployeeEmail();
    List<Request> requestList = requestRepo.findByResponseEmployeeEmailOrderBYPaymentTime(responseEmployeeEmail);

    List<RequestDto> requestDtoList = new ArrayList<>();
    for(Request request : requestList){
      RequestDto requestDto = model.map(request, RequestDto.class);

      PaymentInfo paymentInfo = paymentInfoRepo.findById(request.getPaymentInfo().getPaymentId()).orElse(null);
      PaymentInfoDto paymentInfoDto = model.map(paymentInfo, PaymentInfoDto.class);
      requestDto.setPaymentInfo(paymentInfoDto);

      // employee는 카드 긁은 사람으로다가 보여지게 해야함
      Employee employee = paymentInfo.getIssuedCard().getEmployee();
      EmployeeDto sendEmpDto = model.map(employee, EmployeeDto.class);
      requestDto.setEmployee(sendEmpDto);

      PurposeItem purposeItem = purposeItemRepo.findByPurposeItem(request.getPurposeItem().getPurposeItem());
      PurposeItemDto purposeItemDto = model.map(purposeItem, PurposeItemDto.class);
      requestDto.setPurposeItem(purposeItemDto);

      ApprovalSteps approvalSteps = approvalStepsRepo.findById(request.getApprovalSteps().getApprovalStatusCode()).orElse(null);
      ApprovalStepsDto approvalStepsDto = model.map(approvalSteps, ApprovalStepsDto.class);
      requestDto.setApprovalSteps(approvalStepsDto);

      Integer step = request.getApprovalSteps().getApprovalStatusCode();
      if(step == 1){
        requestDto.setSendRequest("신청");
      }else if(step == 2 || step == 4 || step == 5){
        requestDto.setSendRequest("요청 수정");
      }else if(step == 3 || step == 6) {
        requestDto.setSendRequest("승인 대기중");
      }else if(step == 7){
        requestDto.setSendRequest("최종 승인");
      }else if(step == 8){
        requestDto.setSendRequest("최종 반려");
      }
      requestDtoList.add(requestDto);
    }

    return requestDtoList;
  }

  public List<RequestDto> getToMeApproveList(EmployeeDto employeeDto) {
    Employee emp = model.map(employeeDto, Employee.class);
    // requestEmployeeEmail == 나 자신, requestLevel == 2
    List<Request> request = requestRepo.findByEmployeeAndRequestLevel(emp, 2);

    List<RequestDto> approveRequest = new ArrayList<>();
    for(Request req : request){
      if(req.getApprovalSteps().getApprovalStatusCode() == 7){
        RequestDto requestDto = model.map(req, RequestDto.class);

        PaymentInfo paymentInfo = paymentInfoRepo.findById(req.getPaymentInfo().getPaymentId()).orElse(null);
        PaymentInfoDto paymentInfoDto = model.map(paymentInfo, PaymentInfoDto.class);
        requestDto.setPaymentInfo(paymentInfoDto);

        // employee는 카드 긁은 사람으로다가 보여지게 해야함
        Employee employee = paymentInfo.getIssuedCard().getEmployee();
        EmployeeDto sendEmpDto = model.map(employee, EmployeeDto.class);
        requestDto.setEmployee(sendEmpDto);

        PurposeItem purposeItem = purposeItemRepo.findByPurposeItem(req.getPurposeItem().getPurposeItem());
        PurposeItemDto purposeItemDto = model.map(purposeItem, PurposeItemDto.class);
        requestDto.setPurposeItem(purposeItemDto);

        ApprovalSteps approvalSteps = approvalStepsRepo.findById(req.getApprovalSteps().getApprovalStatusCode()).orElse(null);
        ApprovalStepsDto approvalStepsDto = model.map(approvalSteps, ApprovalStepsDto.class);
        requestDto.setApprovalSteps(approvalStepsDto);

        Integer step = req.getApprovalSteps().getApprovalStatusCode();
        if(step == 1){
          requestDto.setSendRequest("신청");
        }else if(step == 2 || step == 4 || step == 5){
          requestDto.setSendRequest("요청 수정");
        }else if(step == 3 || step == 6) {
          requestDto.setSendRequest("승인 대기중");
        }else if(step == 7){
          requestDto.setSendRequest("최종 승인");
        }else if(step == 8){
          requestDto.setSendRequest("최종 반려");
        }

        approveRequest.add(requestDto);
      }
    }

    return approveRequest;
  }

  public List<RequestDto> getToMeRefuseList(EmployeeDto employeeDto) {
    Employee emp = model.map(employeeDto, Employee.class);
    // requestEmployeeEmail == 나 자신, requestLevel == 2
    List<Request> request = requestRepo.findByEmployeeAndRequestLevel(emp, 2);

    List<RequestDto> approveRequest = new ArrayList<>();
    for(Request req : request){
      if(req.getApprovalSteps().getApprovalStatusCode() == 8){
        RequestDto requestDto = model.map(req, RequestDto.class);

        PaymentInfo paymentInfo = paymentInfoRepo.findById(req.getPaymentInfo().getPaymentId()).orElse(null);
        PaymentInfoDto paymentInfoDto = model.map(paymentInfo, PaymentInfoDto.class);
        requestDto.setPaymentInfo(paymentInfoDto);

        // employee는 카드 긁은 사람으로다가 보여지게 해야함
        Employee employee = paymentInfo.getIssuedCard().getEmployee();
        EmployeeDto sendEmpDto = model.map(employee, EmployeeDto.class);
        requestDto.setEmployee(sendEmpDto);

        PurposeItem purposeItem = purposeItemRepo.findByPurposeItem(req.getPurposeItem().getPurposeItem());
        PurposeItemDto purposeItemDto = model.map(purposeItem, PurposeItemDto.class);
        requestDto.setPurposeItem(purposeItemDto);

        ApprovalSteps approvalSteps = approvalStepsRepo.findById(req.getApprovalSteps().getApprovalStatusCode()).orElse(null);
        ApprovalStepsDto approvalStepsDto = model.map(approvalSteps, ApprovalStepsDto.class);
        requestDto.setApprovalSteps(approvalStepsDto);

        Integer step = req.getApprovalSteps().getApprovalStatusCode();
        if(step == 1){
          requestDto.setSendRequest("신청");
        }else if(step == 2 || step == 4 || step == 5){
          requestDto.setSendRequest("요청 수정");
        }else if(step == 3 || step == 6) {
          requestDto.setSendRequest("승인 대기중");
        }else if(step == 7){
          requestDto.setSendRequest("최종 승인");
        }else if(step == 8){
          requestDto.setSendRequest("최종 반려");
        }

        approveRequest.add(requestDto);
      }
    }

    return approveRequest;
  }

  public PaymentInfoDto getPaymentInfo(Integer paymentId) {
    PaymentInfo paymentInfo = paymentInfoRepo.findById(paymentId).orElse(null);
    PaymentInfoDto paymentInfoDto = model.map(paymentInfo, PaymentInfoDto.class);
    return paymentInfoDto;
  }

  // 신청하기
  public Integer sendRequest(RequestFormDto requestFormDto, EmployeeDto employeeInfo) {
    Employee employee = model.map(employeeInfo, Employee.class);
    PaymentInfo paymentInfo = paymentInfoRepo.findById(requestFormDto.getPaymentId()).orElse(null);
    PurposeItem purposeItem = purposeItemRepo.findById(requestFormDto.getPurposeItemUid()).orElse(null);
//    Request request = Request.builder()
//            .employee(employee)
//            .responseEmployeeEmail()
//            .paymentInfo(paymentInfo)
//            .purposeItem(purposeItem)
//            .participant(requestFormDto.getParticipant())
//            .receiptUrl(requestFormDto.getReceiptUrl())
//            .memo(requestFormDto.getMemo())
//            .
//                              .build();
    return 1;
  }
}
