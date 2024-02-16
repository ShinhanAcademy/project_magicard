package com.magic4.magicard;

import java.util.*;

import org.apache.catalina.util.ToStringUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.magic4.magicard.repository.*;
import com.magic4.magicard.vo.*;

@SpringBootTest
class MagicardApplicationTests {
//
	@Autowired
	RequestRepo requestRepo;
//
	@Autowired
	EmployeeRepo employeeRepo;

	@Autowired
	PurposeCategoryRepo purposeCategoryRepo;

	@Autowired
	PurposeItemRepo purposeItemRepo;

	@Autowired
	CompanyRepo companyRepo;

	@Autowired
	ApprovalStepsRepo approvalStepsRepo;

	@Autowired
	PaymentInfoRepo paymentInfoRepo;

	@Autowired
	EmployeeRankRepo employeeRankRepo;

    @Autowired
    CompanyRegisterRequestRepo companyRegisterRequestRepo;


//    @Test
//    void insertHanati(){
//        companyRegisterRequestRepo.save(CompanyRegisterRequest.builder().isPass(true).companyEmail("hanati@naver.com").companyName("하나금융티아이").build());
//
//    }

//	@Test
//	void contextLoads() {
//		// insertRequest();
//		// insertPurposeCategory();
//		// insertPurposeItem();
//		insertRequest();
//	}
//
//	void insertRequest(){
//		Employee employee = employeeRepo.findById("aa15@naver.com").orElse(null);
//		ApprovalSteps approvalSteps = approvalStepsRepo.findById(5).orElse(null);
//
//		Request request = requestRepo.findById(UUID.fromString("00fa39eb-b308-4fb2-963e-3977187bf813")).orElse(null);
//
//		Company company = employee.getEmployeeRank().getCompany(); // 나의 company 정보
//
//        assert request != null;
//
//		Random random = new Random();
//		List<Employee> superEmployees = employeeRepo.findByDepartment(employee.getDepartment());
//		String superEmployeeEmail = superEmployees.get(random.nextInt(superEmployees.size())).getEmployeeEmail();
//
//
//        Request setRequest = Request.builder()
//				.employee(employee)
//				.responseEmployeeEmail(superEmployeeEmail)
//				.paymentInfo(request.getPaymentInfo())
//				.purposeItem(request.getPurposeItem())
//				.participant(request.getParticipant())
//				.receiptUrl(request.getReceiptUrl())
//				.memo(request.getMemo())
//				.approvalSteps(approvalSteps)
//				.refuseCount(request.getRefuseCount())
//				.requestLevel(2)
//									.build();
//
//
//
//		requestRepo.save(setRequest);
//	}
//
//	void insertRequest_1(){
//		Employee employee = employeeRepo.findById("aa2@naver.com").orElse(null);
//		ApprovalSteps approvalSteps = approvalStepsRepo.findById(1).orElse(null);
//		PaymentInfo paymentInfo = paymentInfoRepo.findById(UUID.fromString("35f86ed0-c7ef-55eb-bf10-b42e99073dcc")).orElse(null);
//		PurposeItem purposeItem = purposeItemRepo.findById(UUID.fromString("f4b24d03-eb07-42b9-a4f4-292e49591c16")).orElse(null);
//
//		Company company = employee.getEmployeeRank().getCompany(); // 나의 company 정보
//
//		// 해당 회원의 super department 를 가져오고
//		// employee.getDepartment().getSuperDepartment();
//		// 회사 코드도 가져오기
//		// 해당 회사의 모든 회원 가져오기
//
//		List<EmployeeRank> myCompanyEmployeeRank = employeeRankRepo.findByCompany(company);
//		// 같은 회사 사람들 리스트
////		List<Employee> companyEmployeeList = findByCompany(myCompanyEmployeeRank);
//
//		Department department = employee.getDepartment();
//		List<Employee> sameDeptEmployees = findByDepartment(myCompanyEmployeeRank, department);
//
//		List<Integer> sameDeptEmpRankList = new ArrayList<>();
//
//		for(Employee emp : sameDeptEmployees){
//			sameDeptEmpRankList.add(emp.getEmployeeRank().getEmployeeRankId());
//		}
//
//		sameDeptEmpRankList.stream().sorted();
//
//		String superEmployee = "";
//
//		// 내가 상급자가 아니라면
//		if(employee.getEmployeeRank().getEmployeeRankId() != sameDeptEmpRankList.get(0)) {
//			// 내 상급자의 랭크는 get(0)
//			for (Employee ee : sameDeptEmployees) {
//				if (ee.getEmployeeRank().getEmployeeRankId() == sameDeptEmpRankList.get(0)) {
//					superEmployee = ee.getEmployeeEmail();
//					System.out.println("superEmp + " + superEmployee);
//				}
//			}
//		}
//		// 내가 상급자라면
//		else {
//			// 상급 부서 찾기
//			Department dept = employee.getDepartment().getSuperDepartment();
//			List<Employee> superDeptEmployees = findByDepartment(myCompanyEmployeeRank, dept);
//
//			superDeptEmployees.stream().forEach(s -> {
//				System.out.println("super => " + s);
//			});
//		}
////
////
//		Request request = Request.builder()
//															.employee(employee)
//				.responseEmployeeEmail(superEmployee)
//															.paymentInfo(paymentInfo)
//															.purposeItem(purposeItem)
//															.participant(null)
//															.receiptUrl(null)
//															.memo(null)
//				.approvalSteps(approvalSteps)
//															.refuseCount(0)
//															.requestLevel(1)
//															.build();
//
//		requestRepo.save(request);
//	}
//
//	// 해당 회사의 같은 부서 사람들을 데러오기
//	List<Employee> findByDepartment(List<EmployeeRank> myCompanyEmployeeRank, Department department){
//		List<Employee> sameDeptEmployees = new ArrayList<>();
//		for(EmployeeRank employeeRank : myCompanyEmployeeRank){
//			List<Employee> employees = employeeRepo.findByEmployeeRankAndDepartment(employeeRank, department);
//			sameDeptEmployees.addAll(employees);
//		}
//		return sameDeptEmployees;
//	}
//
//	// 해당 회사의 사람들을 가져오기
//	List<Employee> findByCompany(List<EmployeeRank> myCompanyEmployeeRank){
//		List<Employee> myCompanyEmployees = new ArrayList<>();
//		for(EmployeeRank empRank : myCompanyEmployeeRank){
//			List<Employee> emp = employeeRepo.findByEmployeeRank(empRank);
//			myCompanyEmployees.addAll(emp);
//		}
//
//		return myCompanyEmployees;
//	}
//
//
//	void insertPurposeItem(){
//		String[][] itemArray = {{"급여", "4대보험", "식대", "포상금", "상여금", "경조사비"}, {"사무실 차임 보증금"},
//		{"난방 시설 교체", "창틀 교체", "도배", "장판 교체"}, {"보험료", "수리비", "주차요금", "통행료"},
//		 {"사무실 전화 요금","인터넷 요금", "팩스 요금"}, {"교통비", "회의비", "통신비", "식비", "유류비"},
//		 {"교통비", "숙박비", "식비"}, {"사무 용품비","행사 용품비"}, {"거래처", "경조사비"}, {"기타"}};
//
//		List<PurposeCategory> categoryList = purposeCategoryRepo.findAll();
//
//		for(int i = 0; i < categoryList.size(); i++) {
//			for(String item : itemArray[i]){
//				PurposeItem purposeItem = PurposeItem.builder()
//																					.purposeCategory(categoryList.get(i))
//																					.purposeItem(item)
//																					.build();
//				purposeItemRepo.save(purposeItem);
//			}
//		}
//
//
//	}
//
//	void insertPurposeCategory(){
//		// String[] categoryList = {"인건비","사업장 임대료", "인테리어 비용", "차량유지비", "통신비", "활동비", "출장비", "비품 구입비", "접대비"};
//		// Company company = companyRepo.findById("SHDS").orElse(null);
//		// for(String category : categoryList){
//		// 	PurposeCategory purposeCategory = PurposeCategory.builder()
//		// 																									.company(company)
//		// 																									.purposeCategory(category)
//		// 																									.build();
//		// 	purposeCategoryRepo.save(purposeCategory);
//		// }
//		Company company = companyRepo.findById("SHDS").orElse(null);
//			PurposeCategory purposeCategory = PurposeCategory.builder()
//																											.company(company)
//																											.purposeCategory("기타")
//																											.build();
//			purposeCategoryRepo.save(purposeCategory);
//	}
//
}
