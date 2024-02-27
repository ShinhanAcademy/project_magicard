package com.magic4.magicard.repository;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.magic4.magicard.vo.ApprovalSteps;
import com.magic4.magicard.vo.Employee;
import com.magic4.magicard.vo.PaymentInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import com.magic4.magicard.vo.Request;
import org.springframework.data.jpa.repository.Query;

public interface RequestRepo extends JpaRepository<Request, Integer> {
        List<Request> findByResponseEmployeeEmailAndApprovalStepsOrderByApprovalStepsAsc(String responseEmployeeEmail,
                        ApprovalSteps approvalSteps);

        List<Request> findByPaymentInfo(PaymentInfo paymentInfo);

        List<Request> findByEmployeeAndRequestLevel(Employee employee, int requestLevel);
        
        List<Request> findByApprovalSteps(ApprovalSteps approvalSteps);
        
    @Query(nativeQuery = true,
        value = "SELECT r.*, p.payment_time " +
                    "FROM request r LEFT JOIN payment_info p " +
                    "on r.payment_id = p.payment_id " +
                    "where r.request_employee_email = ?1 and r.request_level = ?2 " +
                    "order by p.payment_time desc")
    List<Request> findByRequestEmployeeEmailAndRequestLevelOrderByPaymentTime(String requestEmployeeEmail, int requestLevel);

    @Query(nativeQuery = true,
            value = "SELECT r.*, p.payment_time " +
                    "FROM request r LEFT JOIN payment_info p " +
                    "on r.payment_id = p.payment_id " +
                    "where r.response_employee_email = ?1 and r.request_level = ?2 " +
                    "order by p.payment_time desc")
    List<Request> findByResponseEmployeeEmailAndRequestLevelOrderByPaymentTime(String responseEmployeeEmail, int requestLevel);

    @Query(value = "SELECT COUNT(ri.payment_id) AS total_num, SUM(pi.pay_amount) AS total_pay_amount, "
    + "purpose_item_uid, purpose_item, purpose_category_id, purpose_category_id, purpose_category, "
    + "approval_status_code, TO_CHAR(pi.payment_time, 'YYYY-MM') AS payment_month "
    + "FROM (SELECT p.purpose_item_uid AS purpose_item_uid, purpose_item, purpose_category_id, purpose_category, "
    + "r.approval_status_code AS approval_status_code, r.payment_id AS payment_id "
    + "FROM (SELECT i.purpose_item_uid AS purpose_item_uid, i.purpose_item AS purpose_item, "
    + "i.purpose_category_id AS purpose_category_id, c.purpose_category AS purpose_category "
    + "FROM purpose_item i "
    + "JOIN purpose_category c ON i.purpose_category_id = c.purpose_category_id "
    + "WHERE c.company_ticker = 'SHDS') AS p "
    + "JOIN request r ON p.purpose_item_uid = r.purpose_item_uid "
    + "WHERE approval_status_code = 3) AS ri "
    + "JOIN payment_info pi ON ri.payment_id = pi.payment_id "
    + "GROUP BY purpose_item_uid, purpose_item, purpose_category_id, purpose_category_id, "
    + "purpose_category, approval_status_code, payment_month "
    + "ORDER BY purpose_item_uid ASC", nativeQuery = true)
   
List<Map<String, Object>> findRequestNumWhereApprovalFinal();


}
