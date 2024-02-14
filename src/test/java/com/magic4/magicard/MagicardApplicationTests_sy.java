//package com.magic4.magicard;
//
//import java.sql.Timestamp;
//import java.util.*;
//
//import org.apache.catalina.util.ToStringUtil;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import com.magic4.magicard.repository.*;
//import com.magic4.magicard.vo.*;
//
//@SpringBootTest
//class MagicardApplicationTests {
//
//	@Autowired
//	RequestRepo requestRepo;
//
//	@Autowired
//	EmployeeRepo employeeRepo;
//
//	@Autowired
//	PurposeCategoryRepo purposeCategoryRepo;
//
//	@Autowired
//	PurposeItemRepo purposeItemRepo;
//
//	@Autowired
//	CompanyRepo companyRepo;
//
//	@Autowired
//	ApprovalStepsRepo approvalStepsRepo;
//
//	@Autowired
//	PaymentInfoRepo paymentInfoRepo;
//
//	@Autowired
//	EmployeeRankRepo employeeRankRepo;
//
//	@Autowired
//	IssuedCardRepo issuedCardRepo;
//
//	@Test
//	void contextLoads() {
//		insertRequest_1();
////		 insertPurposeCategory();
////		 insertPurposeItem();
////		insertRequest();
////		insertPurposeCategory1();
////		insertPayments();
//	}
//
//	void insertPayments(){
//		IssuedCard issuedCard = issuedCardRepo.findById(UUID.fromString("280a8a4d-a27f-4d01-b031-2a003cc4c037")).orElse(null);
//
//		String[] merchant = {"마포곱창타운", "GS25 동교점",	"포포야어묵", "홍대왕돈까스", "프레쉬", "샐러디", "소주식당", "라멘 모메이", "CafeGate", "뽀르뚜아", "어사출또", "롯데리아 홍대입구점", "영풍문고 홍대점", "중앙문화사 신촌점"};
//		int[] price = {39000, 10000, 13000, 10000, 11000, 11000, 70000, 9000, 4000, 3800, 9000, 7600, 32000, 7000};
//		Timestamp[] time = {Timestamp.valueOf("2024-02-06 18:43:43.000000"),
//				Timestamp.valueOf("2024-02-08 11:44:15.000000"),
//				Timestamp.valueOf("2024-02-01 11:46:31.000000"),
//				Timestamp.valueOf("2024-01-08 11:46:49.000000"),
//				Timestamp.valueOf("2023-11-08 11:48:18.000000"),
//				Timestamp.valueOf("2023-11-12 11:48:41.000000"),
//				Timestamp.valueOf("2023-10-28 19:48:51.000000"),
//				Timestamp.valueOf("2023-12-20 12:58:20.000000"),
//				Timestamp.valueOf("2024-01-13 09:58:33.000000"),
//				Timestamp.valueOf("2023-09-08 11:58:48.000000"),
//				Timestamp.valueOf("2024-02-02 12:58:56.000000"),
//				Timestamp.valueOf("2024-02-08 11:59:06.000000"),
//				Timestamp.valueOf("2024-02-08 11:59:11.000000"),
//				Timestamp.valueOf("2024-02-08 11:59:12.000000")
//};
//
//		for(int i = 0; i < time.length; i++) {
//			PaymentInfo paymentInfo = PaymentInfo.builder()
//					.merchant(merchant[i])
//					.payAmount(price[i])
//					.paymentTime(time[i])
//					.issuedCard(issuedCard)
//					.build();
//			paymentInfoRepo.save(paymentInfo);
//		}
//	}
//
//	void insertRequest(){
//		Employee employee = employeeRepo.findById("aa4@naver.com").orElse(null);
//		ApprovalSteps approvalSteps = approvalStepsRepo.findById(5).orElse(null);
//
//		Request request = requestRepo.findById(1).orElse(null);
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
//		PaymentInfo paymentInfo = paymentInfoRepo.findById(4).orElse(null);
//		PurposeItem purposeItem = purposeItemRepo.findById(2).orElse(null);
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
//			List<Integer> superRank = new ArrayList<>();
//			for(Employee e : superDeptEmployees){
//				superRank.add(e.getEmployeeRank().getRankPriority());
//			}
//			superRank.stream().sorted();
//			for(Employee e : superDeptEmployees){
//				if(e.getEmployeeRank().getRankPriority() == superRank.get(superRank.size()-1)){
//					superEmployee = e.getEmployeeEmail();
//				}
//			}
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
//	void insertPurposeCategory1(){
//		String[] categoryArray = {"인건비", "사업장 임대료", "인테리어 비용", "차량유지비",	"통신비", "활동비", "출장비", "비품 구입비", "접대비", "기타"};
//
//		Company company = companyRepo.findById("SHDS").orElse(null);
//		for(int i = 0; i < categoryArray.length; i++){
//			PurposeCategory purposeCategory = PurposeCategory.builder()
//					.purposeCategory(categoryArray[i]).company(company).build();
//			purposeCategoryRepo.save(purposeCategory);
//		}
//	}
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
//
//}
