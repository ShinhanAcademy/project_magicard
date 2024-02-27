package com.magic4.magicard.controller;

import com.magic4.magicard.dto.EmployeeEmailDto;
import com.magic4.magicard.dto.top5.DepartmentSpendDto;
import com.magic4.magicard.dto.top5.EmployeeSpendDto;
import com.magic4.magicard.service.IssuedCardService;
import com.magic4.magicard.service.PaymentInfoService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/dashboard")
public class DashboardController {

    private final IssuedCardService issuedCardService;
    private final PaymentInfoService paymentInfoService;
    EmployeeEmailDto employeeEmailDto = EmployeeEmailDto
            .builder()
            .employeeEmail("aa3@naver.com")
            .build();
    @GetMapping("/totalCards")
    public Long selectTotalCards(HttpSession session){
        return issuedCardService.totalCards(employeeEmailDto);
    }

    @GetMapping("/totalUses")
    public Long selectTotalUses(HttpSession session){
        return paymentInfoService.selectTotalUses(employeeEmailDto);
    }

    @GetMapping("/totalPayment")
    public Long selectTotalPayment(HttpSession session){
        return paymentInfoService.selectTotalPayment(employeeEmailDto);
    }
    @GetMapping("/totalApproval")
    public Long selectTotalApproval(HttpSession session){
        return paymentInfoService.selectTotalApproval(employeeEmailDto);
    }
//    @GetMapping("/monthylyDonationAmount")
//    public Long selectMonthlyDonation(HttpSession session){
//        return paymentInfoService.selectTotalApproval(employeeEmailDto);
//    }
    @GetMapping("/totalDonationAmount")
    public Long selectTotalDonation(HttpSession session){
        return paymentInfoService.selectTotalDonationAmount(employeeEmailDto);
    }

    @GetMapping("/top5/department")
    public List<DepartmentSpendDto> selectTop5Department(){
        return paymentInfoService.selectTop5Department(employeeEmailDto);

    }
    @GetMapping("/top5/employee")
    public List<EmployeeSpendDto> selectTop5Employee(HttpSession session){
        return paymentInfoService.selectTop5Employee(employeeEmailDto);

    }
}
