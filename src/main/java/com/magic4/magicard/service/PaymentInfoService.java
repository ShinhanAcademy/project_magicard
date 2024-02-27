package com.magic4.magicard.service;

import java.util.*;

import com.magic4.magicard.dto.*;
import com.magic4.magicard.dto.top5.DepartmentSpendDto;
import com.magic4.magicard.dto.top5.EmployeeSpendDto;
import com.magic4.magicard.repository.*;
import com.magic4.magicard.vo.*;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentInfoService {
  private final IssuedCardRepo issuedCardRepo;
  private final PaymentInfoRepo paymentInfoRepo;
  private final RequestRepo requestRepo;
  private final EmployeeRepo employeeRepo;
  private final DepartmentRepo departmentRepo;
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
        } else if(firstStep == 2 ||  firstStep == 3 || firstStep == 5){ // 승인, 최종 반려
          paymentInfoDto.setSendRequest("조회");
        }
      } else { // 2단계 신청도 들어간 경우
        ApprovalSteps firstStep = null;
        ApprovalSteps secondStep = null;
        for(Request req : request){
          if(req.getRequestLevel() == 1){
            firstStep = req.getApprovalSteps();
            paymentInfoDto.setFirstStepStatus(firstStep.getApprovalStep());
          }else if(req.getRequestLevel() == 2){
            secondStep = req.getApprovalSteps();
            paymentInfoDto.setSecondStepStatus(secondStep.getApprovalStep());
          }
        }
        paymentInfoDto.setSendRequest("조회");
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

  public Long selectTotalDonationAmount(EmployeeEmailDto employeeEmailDto) {
    double totalDonationAmount = paymentInfoRepo.totalApproval(changeDtoToEntity(employeeEmailDto).getEmployeeEmail())*0.0015;
    return (long)totalDonationAmount;
    
  }

  private Employee changeDtoToEntity(EmployeeEmailDto employeeEmailDto) {
    return Employee.builder().employeeEmail(employeeEmailDto.getEmployeeEmail()).build();

  }

    public int getRequestInfoByRequestId(int paymentId) {
      PaymentInfo paymentInfo = paymentInfoRepo.findByPaymentId(paymentId);
      List<Request> request = requestRepo.findByPaymentInfo(paymentInfo);
      return request.get(0).getRequestID();
    }

  public List<DepartmentSpendDto> selectTop5Department(EmployeeEmailDto employeeEmailDto){
    List<String> departmentNameList = departmentRepo.selectTop5Department(employeeEmailDto.getEmployeeEmail());
    List<Integer> totalPayAmountList = paymentInfoRepo.selectTop5Department(employeeEmailDto.getEmployeeEmail());
    List<Double> departmentSpendRatioList = paymentInfoRepo.selectTop5DepartmentRatio(employeeEmailDto.getEmployeeEmail());

    List<DepartmentSpendDto> departmentSpendDtoList= new ArrayList<>();

    // 리스트의 크기가 서로 동일하다고 가정하고 리스트 순회
    for (int i = 0; i < departmentNameList.size(); i++) {
      // 객체 생성
      DepartmentSpendDto dto = DepartmentSpendDto
              .builder()
              .departmentName(departmentNameList.get(i))// DepartmentDto에서 부서 이름을 가져옴
              .totalPayAmount(totalPayAmountList.get(i))// PaymentInfoDto에서 총 지급 금액을 가져옴
              .departmentSpendRatio(departmentSpendRatioList.get(i))
              .build();
      // 생성된 DTO를 리스트에 추가
      departmentSpendDtoList.add(dto);
    }
    return departmentSpendDtoList;
  }

  public List<EmployeeSpendDto> selectTop5Employee(EmployeeEmailDto employeeEmailDto) {
    // 각각의 DTO 리스트를 가져오는 로직
    List<String> employeeNameList = employeeRepo.selectTop5Employee(employeeEmailDto.getEmployeeEmail());
    List<String> departmentNameList = departmentRepo.selectTop5Employee(employeeEmailDto.getEmployeeEmail());
    List<Integer> totalPayAmountList = paymentInfoRepo.selectTop5Employee(employeeEmailDto.getEmployeeEmail());

    List<EmployeeSpendDto> employeeSpendDtoList = new ArrayList<>();

    // 리스트의 크기가 서로 동일하다고 가정하고 각 리스트를 순회
    for (int i = 0; i < employeeNameList.size(); i++) {
      // EmployeeSpendDto 객체 생성
      EmployeeSpendDto dto = EmployeeSpendDto
              .builder()
              .employeeName(employeeNameList.get(i))// EmployeeDto에서 직원 이름을 가져옴
              .departmentName(departmentNameList.get(i))// DepartmentDto에서 부서 이름을 가져옴
              .totalPayAmount(totalPayAmountList.get(i))// PaymentInfoDto에서 총 지급 금액을 가져옴
              .build();
              // 생성된 DTO를 리스트에 추가
      employeeSpendDtoList.add(dto);
    }
    return employeeSpendDtoList;
  }


//  public List<EmployeeSpendDto> findTop5Spenders(String employeeEmail) {
//    String sql = "SELECT e.employee_name as employeeName, d.department_name as departmentName, SUM(pi2.pay_amount) as totalPayAmount " +
//            "FROM payment_info pi2 " +
//            "JOIN issued_card ic ON ic.issued_card_id = pi2.issued_card_id " +
//            "JOIN employee e ON e.employee_email = ic.employee_email " +
//            "JOIN department d ON e.department_id = d.department_id " +
//            "JOIN employee_rank er ON er.rank_priority = e.rank_priority " +
//            "JOIN company c ON c.company_ticker = er.company_ticker " +
//            "WHERE c.company_name = ( " +
//            "    SELECT c.company_name FROM employee e " +
//            "    LEFT JOIN employee_rank er ON er.employee_rank_id = e.rank_priority " +
//            "    LEFT JOIN company c ON c.company_ticker = er.company_ticker " +
//            "    WHERE e.employee_email = :employeeEmail) " +
//            "GROUP BY e.employee_name, d.department_name, c.company_name " +
//            "ORDER BY totalPayAmount DESC " +
//            "LIMIT 5";
//
//    Query query = entityManager.createNativeQuery(sql);
//    query.setParameter("employeeEmail", employeeEmail);
//    List<Object[]> result = query.getResultList();
//
//    return result.stream().map(obj -> new EmployeeSpendDto(
//            (String) obj[0], // employeeName
//            (String) obj[1], // departmentName
//            (BigDecimal) obj[2] // totalPayAmount
//    )).collect(Collectors.toList());
//  }

}
