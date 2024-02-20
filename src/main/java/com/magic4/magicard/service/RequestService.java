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
import java.util.Collections;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class RequestService {
  private final RequestRepo requestRepo;
  private final ApprovalStepsRepo approvalStepsRepo;
  private final IssuedCardRepo issuedCardRepo;
  private final PaymentInfoRepo paymentInfoRepo;
  private final PurposeItemRepo purposeItemRepo;
  private final EmployeeRepo employeeRepo;
  private final DepartmentRepo departmentRepo;
  private ModelMapper model = new ModelMapper();

  // 전체 내가 신청 내역 가져오기
  public List<RequestDto> getRequestAll(EmployeeDto employeeDto){
    Employee employee = employeeRepo.findById(employeeDto.getEmployeeEmail()).orElse(null);
    List<Request> requestList = requestRepo.findByRequestEmployeeEmailAndRequestLevelOrderBYPaymentTime(employee.getEmployeeEmail(), 1);
    List<RequestDto> result = new ArrayList<>();
    for(Request request : requestList){
      RequestDto requestDto = model.map(request, RequestDto.class);

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
      if(step == 1 || step == 2 || step == 4) {
        requestDto.setSendRequest("수정");
      }else if(step == 5) {
        requestDto.setSendRequest("조회");
      }

      result.add(requestDto);
    }
    return result;
  }

  public List<RequestDto> getRequestList(EmployeeDto employeeDto) {
    return getRequestAll(employeeDto);
  }

  public List<RequestDto> getApproveList(EmployeeDto employeeDto) {
    List<RequestDto> allRequest = getRequestAll(employeeDto);

    List<RequestDto> requestDtoList = new ArrayList<>();

    for(RequestDto requestDto : allRequest){
      if(requestDto.getApprovalSteps().getApprovalStatusCode() == 2){
        requestDtoList.add(requestDto);
      }
    }
    return requestDtoList;
  }

  public List<RequestDto> getRefuseList(EmployeeDto employeeDto) {
    List<RequestDto> allRequest = getRequestAll(employeeDto);

    List<RequestDto> requestDtoList = new ArrayList<>();

    for(RequestDto requestDto : allRequest){
      if(requestDto.getApprovalSteps().getApprovalStatusCode() == 5){
        requestDtoList.add(requestDto);
      }
    }
    return requestDtoList;
  }

  // 내게 온 요청 리스트
  public List<RequestDto> getToMeAllRequestList(EmployeeDto employeeDto) {
    String responseEmployeeEmail = employeeDto.getEmployeeEmail();
    List<Request> requestList = requestRepo.findByResponseEmployeeEmailAndRequestLevelOrderByPaymentTime(employeeDto.getEmployeeEmail(), 1);

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
        requestDto.setSendRequest("확인");
      }else {
        requestDto.setSendRequest("조회");
      }
      requestDtoList.add(requestDto);
    }

    return requestDtoList;
  }

  public List<RequestDto> getToMeRequestList(EmployeeDto employeeDto){
    return getToMeAllRequestList(employeeDto);
  }

  public Integer getToMeRequestCount(EmployeeDto employeeDto) {
    List<RequestDto> requestDtoList = getToMeAllRequestList(employeeDto);
    return requestDtoList.size();
  }

  // 재무부에게 요청한 리스트
  public List<RequestDto> getToTopAllRequestList(EmployeeDto employeeDto) {
    String responseEmployeeEmail = employeeDto.getEmployeeEmail();
    List<Request> requestList = requestRepo.findByRequestEmployeeEmailAndRequestLevelOrderBYPaymentTime(employeeDto.getEmployeeEmail(), 2);

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
      if(step == 2){
        requestDto.setSendRequest("확인");
      }else {
        requestDto.setSendRequest("조회");
      }
      requestDtoList.add(requestDto);
    }

    return requestDtoList;
  }

  // 재무부에게 요청한 리스트
  public List<RequestDto> getToTopRequestList(EmployeeDto employeeDto) {
    return getToTopAllRequestList(employeeDto);
  }


  // 내가 재무부에 재요청한 것 중 승인된 것
  public List<RequestDto> getToTopApproveList(EmployeeDto employeeDto) {
    List<RequestDto> requestDtoList = getToTopAllRequestList(employeeDto);
    List<RequestDto> result = new ArrayList<>();

    for(RequestDto requestDto : requestDtoList) {
      int step = requestDto.getApprovalSteps().getApprovalStatusCode();
      if(step == 2 || step == 3){
        result.add(requestDto);
      }
    }
    return result;

  }

  // 내가 재무부에 재요청한 것 중 거절된 것
  public List<RequestDto> getToTopRefuseList(EmployeeDto employeeDto) {
    List<RequestDto> requestDtoList = getToTopAllRequestList(employeeDto);
    List<RequestDto> result = new ArrayList<>();

    for(RequestDto requestDto : requestDtoList) {
      int step = requestDto.getApprovalSteps().getApprovalStatusCode();
      if(step == 4 || step == 5){
        result.add(requestDto);
      }
    }
    return result;
  }

  public PaymentInfoDto getPaymentInfo(Integer paymentId) { // 신청 아무것도 안했을 때
    PaymentInfo paymentInfo = paymentInfoRepo.findById(paymentId).orElse(null);
    PaymentInfoDto paymentInfoDto = model.map(paymentInfo, PaymentInfoDto.class);

    return paymentInfoDto;
  }

  // 신청하기
  public Integer sendRequest(RequestFormDto requestFormDto, EmployeeDto employeeDto) {
    Employee employee = employeeRepo.findById(employeeDto.getEmployeeEmail()).orElse(null);
    PaymentInfo paymentInfo = paymentInfoRepo.findById(requestFormDto.getPaymentId()).orElse(null);
    PurposeItem purposeItem = purposeItemRepo.findById(requestFormDto.getPurposeItemUid()).orElse(null);

    ApprovalSteps approvalSteps = approvalStepsRepo.findById(1).orElse(null);

    Request request = Request.builder()
            .employee(employee)
            .paymentInfo(paymentInfo)
            .purposeItem(purposeItem)
            .participant(requestFormDto.getParticipant())
            .receiptUrl(requestFormDto.getReceiptUrl())
            .memo(requestFormDto.getMemo())
            .approvalSteps(approvalSteps)
            .requestLevel(1)
            .build();

    // 내가 우리 회사의 상급자인지 확인하기
    List<Integer> sameDept = new ArrayList<>();
    List<Employee> sameDeptEmployees = employeeRepo.findByDepartment(employee.getDepartment());
    for(Employee emp : sameDeptEmployees){
      sameDept.add(emp.getEmployeeRank().getRankPriority());
    }
    Collections.sort(sameDept);
    String superEmp = "";
    if(sameDept.get(0) == employee.getEmployeeRank().getRankPriority()){
      // 내가 상위관리자면 상위 부서의 상급 관리자 찾기
      Department superDepartment = employee.getDepartment();
      List<Integer> superDept = new ArrayList<>();
      List<Employee> superDeptEmployees = employeeRepo.findByDepartment(superDepartment);
      for(Employee emp : superDeptEmployees) {
        superDept.add(emp.getEmployeeRank().getRankPriority());
      }
      Collections.sort(superDept);
      for(Employee emp : superDeptEmployees){
        if(emp.getEmployeeRank().getRankPriority() == superDept.get(0)){
          superEmp = emp.getEmployeeEmail();
          request.setResponseEmployeeEmail(superEmp);
          break;
        }
      }
    } else {
      for(Employee emp : sameDeptEmployees){
        if(emp.getEmployeeRank().getRankPriority() == sameDept.get(0)){
          superEmp = emp.getEmployeeEmail();
          request.setResponseEmployeeEmail(superEmp);
          break;
        }
      }
    }

    requestRepo.save(request);

    return 1;
  }

  // requestInfo 불러오기, 수정, 조회, 확인
  public RequestDto getRequestInfo(Integer paymentId) { // 신청 아무것도 안했을 때
    PaymentInfo paymentInfo = paymentInfoRepo.findById(paymentId).orElse(null);
    PaymentInfoDto paymentInfoDto = model.map(paymentInfo, PaymentInfoDto.class);
    System.out.println(paymentInfoDto.getPaymentTime());
    System.out.println(paymentInfoDto.getPayAmount());

    List<Request> request = requestRepo.findByPaymentInfo(paymentInfo);

    RequestDto requestDto = null;
PurposeItem purposeItem = null;
PurposeItemDto purposeItemDto = null;
    if(request.size() == 1){
      requestDto = model.map(request.get(0), RequestDto.class);
      purposeItem = purposeItemRepo.findById(request.get(0).getPurposeItem().getPurposeItemUid()).orElse(null);
      purposeItemDto = model.map(purposeItem, PurposeItemDto.class);
      purposeItemDto.setPurposeCategory(purposeItem.getPurposeCategory().getPurposeCategory());
    }else if(request.size() == 2){
      requestDto = model.map(request.get(1), RequestDto.class);
      purposeItem = purposeItemRepo.findById(request.get(1).getPurposeItem().getPurposeItemUid()).orElse(null);
      purposeItemDto = model.map(purposeItem, PurposeItemDto.class);
      purposeItemDto.setPurposeCategory(purposeItem.getPurposeCategory().getPurposeCategory());
    }
    requestDto.setPaymentInfo(paymentInfoDto);
    requestDto.setPurposeItem(purposeItemDto);

    return requestDto;
  }


  public Integer updateRequest(RequestFormDto requestFormDto, EmployeeDto employeeInfo) {
    Request request = requestRepo.findById(requestFormDto.getRequestId()).orElse(null);
    PurposeItem purposeItem = purposeItemRepo.findById(requestFormDto.getPurposeItemUid()).orElse(null);

    ApprovalSteps approvalSteps = approvalStepsRepo.findById(1).orElse(null);

    request.setPurposeItem(purposeItem);
    request.setParticipant(requestFormDto.getParticipant());
    request.setReceiptUrl(requestFormDto.getReceiptUrl());
    request.setMemo(requestFormDto.getMemo());
    request.setApprovalSteps(approvalSteps);

    requestRepo.save(request);

    return 1;
  }

  public Integer confirmRequest(RequestFormDto requestFormDto, EmployeeDto employeeDto) {
    Employee employee = employeeRepo.findById(employeeDto.getEmployeeEmail()).orElse(null);

    Request request = requestRepo.findById(requestFormDto.getRequestId()).orElse(null);
    ApprovalSteps approvalSteps3 = approvalStepsRepo.findById(2).orElse(null);
    request.setApprovalSteps(approvalSteps3);
    requestRepo.save(request);

    ApprovalSteps approvalSteps1 = approvalStepsRepo.findById(1).orElse(null);
    request.setApprovalSteps(approvalSteps3);

    Department superDept = departmentRepo.findById(17).orElse(null);
    List<Employee> superEmp = employeeRepo.findByDepartment(superDept);

    Random random = new Random();
    String superEmployeeEmail = superEmp.get(random.nextInt(superEmp.size())).getEmployeeEmail();

    PaymentInfo paymentInfo = paymentInfoRepo.findById(request.getPaymentInfo().getPaymentId()).orElse(null);
    PurposeItem purposeItem = purposeItemRepo.findById(request.getPurposeItem().getPurposeItemUid()).orElse(null);
    Request sendRequest = Request.builder()
            .employee(employee)
            .responseEmployeeEmail(superEmployeeEmail)
            .paymentInfo(paymentInfo)
            .purposeItem(purposeItem)
            .participant(requestFormDto.getParticipant())
            .receiptUrl(requestFormDto.getReceiptUrl())
            .memo(requestFormDto.getMemo())
            .approvalSteps(approvalSteps1)
            .refuseCount(0)
            .requestLevel(2)
            .build();
    requestRepo.save(sendRequest);
    return 1;
  }

    public Integer refuseRequest(RejectFormDto rejectFormDto) {
    ApprovalSteps approvalSteps4 = approvalStepsRepo.findById(4).orElse(null);
    ApprovalSteps approvalSteps5 = approvalStepsRepo.findById(5).orElse(null);
      Request request = requestRepo.findById(rejectFormDto.getRequestId()).orElse(null);
    int refuseCount = request.getRefuseCount();
      request.setRefuseMessage(rejectFormDto.getRefuseMessage());
      request.setRefuseCount(refuseCount+1);

      if(refuseCount + 1 >= 2){
        request.setApprovalSteps(approvalSteps5);
      }
      else {
        request.setApprovalSteps(approvalSteps4);
      }
      requestRepo.save(request);
      return 1;
    }

}
