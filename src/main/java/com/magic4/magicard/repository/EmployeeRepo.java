package com.magic4.magicard.repository;

import com.magic4.magicard.dto.EmployeeDto;
import com.magic4.magicard.dto.EmployeeInfoDto;
import com.magic4.magicard.vo.Company;
import com.magic4.magicard.vo.Department;
import com.magic4.magicard.vo.Employee;
import com.magic4.magicard.vo.EmployeeRank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, String> {

    // 회사의 전체 직원 조회
    List<Employee> findAllByEmployeeRankIn(List<EmployeeRank> employeeRank);

    List<Employee> findAllByDepartmentAndEmployeeRankIn(Department department, List<EmployeeRank> employeeRank);

    List<Employee> findAllByEmployeeRank(EmployeeRank employeeRank);

    List<Employee> findByDepartment(Department department);

    List<Employee> findByEmployeeRank(EmployeeRank employeeRank);

    List<Employee> findByEmployeeRankAndDepartment(EmployeeRank employeeRank, Department department);

    List<Employee> findAllByDepartmentIn(List<Department> departmentList);


    @Query(nativeQuery = true,
            value = "select e.employee_name\n" +
                    "from payment_info pi2 \n" +
                    "join issued_card ic on ic.issued_card_id =pi2.issued_card_id \n" +
                    "join employee e on e.employee_email =ic.employee_email \n" +
                    "join department d on e.department_id =d.department_id \n" +
                    "join employee_rank er on er.rank_priority =e.rank_priority \n" +
                    "join company c on c.company_ticker =er.company_ticker\n" +
                    "where c.company_name =(\n" +
                    " \t\t\t\t\tselect c.company_name from employee e \n" +
                    "\t\t\t\t\tleft join employee_rank er on er.employee_rank_id =e.rank_priority\n" +
                    "\t\t\t\t\tleft join company c on c.company_ticker =er.company_ticker\n" +
                    "\t\t\t\t\twhere e.employee_email =?)\t\t\t\t\t\n" +
                    "AND EXTRACT(YEAR FROM pi2.payment_time) = EXTRACT(YEAR FROM CURRENT_DATE)\n" +
                    "AND EXTRACT(MONTH FROM pi2.payment_time) = EXTRACT(MONTH FROM CURRENT_DATE)" +
                    "group by e.employee_name, d.department_name, c.company_name \n" +
                    "order by sum(pi2.pay_amount) desc \n" +
                    "limit 5;")
    List<String> selectTop5Employee(String employeeEmail);
}
