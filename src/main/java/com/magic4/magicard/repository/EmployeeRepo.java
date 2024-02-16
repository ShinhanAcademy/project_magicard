package com.magic4.magicard.repository;

import com.magic4.magicard.dto.EmployeeInfoDto;
import com.magic4.magicard.vo.Company;
import com.magic4.magicard.vo.Department;
import com.magic4.magicard.vo.Employee;
import com.magic4.magicard.vo.EmployeeRank;
import org.springframework.data.jpa.repository.JpaRepository;
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

//    List<Employee> findByCompany(Company company);
}
