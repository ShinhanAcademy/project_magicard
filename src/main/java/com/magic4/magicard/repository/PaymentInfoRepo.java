package com.magic4.magicard.repository;

import java.sql.Timestamp;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.magic4.magicard.vo.IssuedCard;
import com.magic4.magicard.vo.PaymentInfo;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface PaymentInfoRepo extends JpaRepository<PaymentInfo, Integer> {
  List<PaymentInfo> findByIssuedCardOrderByPaymentTimeDesc(IssuedCard issuedCard);
  @Query("SELECT p FROM PaymentInfo p WHERE p.issuedCard = :issuedCard AND YEAR(p.paymentTime) = YEAR(CURRENT_DATE()) AND MONTH(p.paymentTime) = MONTH(CURRENT_DATE())")
  List<PaymentInfo> findByIssuedCardAndThisMonth(@Param("issuedCard") IssuedCard issuedCard);

  PaymentInfo findByPaymentId(Integer paymentId);

  //총 사용 건수 조회 (거래 횟수)
  @Query(nativeQuery = true,
          value = "select count(*) from payment_info pi2 \n" +
                  "inner join issued_card ic \n" +
                  "on ic.issued_card_id =pi2.issued_card_id \n" +
                  "inner join employee e \n" +
                  "on e.employee_email = ic.employee_email \n" +
                  "inner join employee_rank er \n" +
                  "on e.rank_priority =er.rank_priority \n" +
                  "inner join company c \n" +
                  "on c.company_ticker =er.company_ticker \n" +
                  "where c.company_name =(\n" +
                  "\tselect c.company_name from employee e \n" +
                  "\tjoin employee_rank er \n" +
                  "\ton er.employee_rank_id =e.rank_priority\n" +
                  "\tjoin company c \n" +
                  "\ton c.company_ticker =er.company_ticker\n" +
                  "\twhere e.employee_email =?);")
  Long totalUses(String employeeEmail);

  //카드 총 사용 금액 조회
  @Query(nativeQuery = true,
          value="select COALESCE(SUM(pi2.pay_amount), 0) from payment_info pi2 \n" +
                  "join issued_card ic \n" +
                  "on ic.issued_card_id =pi2.issued_card_id \n" +
                  "join employee e \n" +
                  "on e.employee_email =ic.employee_email \n" +
                  "join employee_rank er \n" +
                  "on er.rank_priority =e.rank_priority \n" +
                  "join company c \n" +
                  "on er.company_ticker =c.company_ticker \n" +
                  "join request r \n" +
                  "on r.payment_id = pi2.payment_id \n" +
                  "where c.company_name = (select c.company_name from employee e \n" +
                  "\tjoin employee_rank er \n" +
                  "\ton er.employee_rank_id =e.rank_priority\n" +
                  "\tjoin company c \n" +
                  "\ton c.company_ticker =er.company_ticker\n" +
                  "\twhere e.employee_email =?);")
  Long totalPayment(String employeeEmail);

  //카드 총 승인 금액 조회
  @Query(nativeQuery = true,
        value="select COALESCE(SUM(pi2.pay_amount), 0) from payment_info pi2 \n" +
                "join issued_card ic \n" +
                "on ic.issued_card_id =pi2.issued_card_id \n" +
                "join employee e \n" +
                "on e.employee_email =ic.employee_email \n" +
                "join employee_rank er \n" +
                "on er.rank_priority =e.rank_priority \n" +
                "join company c \n" +
                "on er.company_ticker =c.company_ticker \n" +
                "join request r \n" +
                "on r.payment_id = pi2.payment_id \n" +
                "join approval_steps as2 \n" +
                "on as2.approval_status_code = r.approval_status_code \n" +
                "where as2.approval_status_code =3 \n" +
                "and c.company_name = (select c.company_name from employee e \n" +
                "\tjoin employee_rank er \n" +
                "\ton er.employee_rank_id =e.rank_priority\n" +
                "\tjoin company c \n" +
                "\ton c.company_ticker =er.company_ticker\n" +
                "\twhere e.employee_email =?);")
  Long totalApproval(String employeeEmail);
}
