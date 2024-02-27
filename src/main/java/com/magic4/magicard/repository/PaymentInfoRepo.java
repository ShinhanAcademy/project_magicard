package com.magic4.magicard.repository;

import java.sql.Timestamp;
import java.util.UUID;

import com.magic4.magicard.dto.EmployeeDto;
import com.magic4.magicard.dto.PaymentInfoDto;
import com.magic4.magicard.dto.top5.EmployeeSpendDto;
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

  List<PaymentInfo> findByIssuedCard(IssuedCard issuedCard);

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

  @Query(nativeQuery = true,
        value = "select sum(pi2.pay_amount) as totalPayAmount\n" +
                "from payment_info pi2 \n" +
                "join issued_card ic on ic.issued_card_id =pi2.issued_card_id \n" +
                "join employee e on e.employee_email =ic.employee_email \n" +
                "join department d on e.department_id =d.department_id \n" +
                "join employee_rank er on er.rank_priority =e.rank_priority \n" +
                "join company c on c.company_ticker =er.company_ticker\n" +
                "where c.company_name =( " +
                " select c.company_name from employee e \n" +
                " left join employee_rank er on er.employee_rank_id =e.rank_priority\n" +
                " left join company c on c.company_ticker =er.company_ticker\n" +
                " where e.employee_email = :employeeEmail )" +
                "group by e.employee_name, d.department_name, c.company_name \n" +
                "order by totalPayAmount desc \n" +
                "limit 5;")
  List<Integer> selectTop5Employee(String employeeEmail);

  @Query(nativeQuery = true,
        value = "select sum(pi2.pay_amount) as totalPayAmount\n" +
                "from payment_info pi2 \n" +
                "join issued_card ic on ic.issued_card_id =pi2.issued_card_id \n" +
                "join employee e on e.employee_email =ic.employee_email \n" +
                "join department d on e.department_id =d.department_id \n" +
                "join employee_rank er on er.rank_priority =e.rank_priority \n" +
                "where er.company_ticker =(\n" +
                " \t\t\t\t\tselect c.company_ticker from employee e \n" +
                "\t\t\t\t\tleft join employee_rank er on er.employee_rank_id =e.rank_priority\n" +
                "\t\t\t\t\tleft join company c on c.company_ticker =er.company_ticker\n" +
                "\t\t\t\t\twhere e.employee_email =?)\n" +
                "AND date_trunc('month', pi2.payment_time) = date_trunc('month', CURRENT_DATE) \n" +
                "group by d.department_name, er.company_ticker \n" +
                "order by totalPayAmount desc\n" +
                "limit 5;")
  List<Integer> selectTop5Department(String employeeEmail);


  @Query(nativeQuery = true,
          value = "SELECT\n" +
                  "    CAST(department_total AS FLOAT) / company_total * 100 AS departmentSpendRatio\n" +
                  "FROM (\n" +
                  "    SELECT\n" +
                  "        d.department_name,\n" +
                  "        SUM(pi2.pay_amount) AS department_total,\n" +
                  "        (SELECT total FROM (\n" +
                  "    SELECT SUM(pi2.pay_amount) AS total\n" +
                  "    FROM payment_info pi2\n" +
                  "    JOIN issued_card ic ON ic.issued_card_id = pi2.issued_card_id\n" +
                  "    JOIN employee e ON e.employee_email = ic.employee_email\n" +
                  "    JOIN employee_rank er ON er.rank_priority = e.rank_priority\n" +
                  "    WHERE er.company_ticker = (\n" +
                  "        SELECT c.company_ticker\n" +
                  "        FROM employee e\n" +
                  "        LEFT JOIN employee_rank er ON er.employee_rank_id = e.rank_priority\n" +
                  "        LEFT JOIN company c ON c.company_ticker = er.company_ticker\n" +
                  "        WHERE e.employee_email = ?1\n" +
                  "    ) AND date_trunc('month', pi2.payment_time) = date_trunc('month', CURRENT_DATE)\n" +
                  ")) AS company_total\n" +
                  "    FROM payment_info pi2\n" +
                  "    JOIN issued_card ic ON ic.issued_card_id = pi2.issued_card_id\n" +
                  "    JOIN employee e ON e.employee_email = ic.employee_email\n" +
                  "    JOIN department d ON e.department_id = d.department_id\n" +
                  "    JOIN employee_rank er ON er.rank_priority = e.rank_priority\n" +
                  "    WHERE er.company_ticker = (\n" +
                  "        SELECT c.company_ticker\n" +
                  "        FROM employee e\n" +
                  "        LEFT JOIN employee_rank er ON er.employee_rank_id = e.rank_priority\n" +
                  "        LEFT JOIN company c ON c.company_ticker = er.company_ticker\n" +
                  "        WHERE e.employee_email = ?1\n" +
                  "    ) AND date_trunc('month', pi2.payment_time) = date_trunc('month', CURRENT_DATE)\n" +
                  "    GROUP BY d.department_name\n" +
                  ")\n" +
                  "ORDER BY department_total DESC\n" +
                  "LIMIT 5;")
  List<Double> selectTop5DepartmentRatio(String employeeEmail);


}
