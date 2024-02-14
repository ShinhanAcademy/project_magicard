package com.magic4.magicard.repository;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

import com.magic4.magicard.vo.ApprovalSteps;
import com.magic4.magicard.vo.Employee;
import com.magic4.magicard.vo.PaymentInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import com.magic4.magicard.vo.Request;
import org.springframework.data.jpa.repository.Query;

public interface RequestRepo extends JpaRepository<Request, Integer>{
    List<Request> findByResponseEmployeeEmailAndApprovalStepsOrderByApprovalStepsAsc(String responseEmployeeEmail, ApprovalSteps approvalSteps);
    List<Request> findByPaymentInfo(PaymentInfo paymentInfo);
    List<Request> findByEmployeeAndRequestLevel(Employee employee, int requestLevel);
    List<Request> findByResponseEmployeeEmail(String responseEmployeeEmail);

    @Query(nativeQuery = true,
            value = "SELECT r.*, p.payment_time " +
                    "FROM request r LEFT JOIN payment_info p " +
                    "on r.payment_id = p.payment_id " +
                    "where r.response_employee_email = ? " +
                    "order by p.payment_time desc")
    List<Request> findByResponseEmployeeEmailOrderBYPaymentTime(String responseEmployeeEmail);
}
