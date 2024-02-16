package com.magic4.magicard.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.magic4.magicard.vo.Employee;
import com.magic4.magicard.vo.IssuedCard;
import org.springframework.data.jpa.repository.Query;

public interface IssuedCardRepo extends JpaRepository<IssuedCard, UUID>{
  IssuedCard findByEmployee(Employee employee);

  @Query(nativeQuery = true,
          value = "select count(*) from issued_card ic " +
                  "inner join employee e " +
                  "on e.employee_email = ic.employee_email " +
                  "inner join employee_rank er " +
                  "on e.rank_priority = er.rank_priority " +
                  "inner join company c " +
                  "on er.company_ticker =c.company_ticker " +
                  "where c.company_name = ( " +
                  "select c.company_name from employee e " +
                  "join employee_rank er " +
                  "on er.employee_rank_id =e.rank_priority " +
                  "join company c " +
                  "on c.company_ticker =er.company_ticker " +
                  "where e.employee_email =?1)")
  Long totalCards(String employeeEmail);

}
