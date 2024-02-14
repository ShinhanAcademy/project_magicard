package com.magic4.magicard.repository;

import com.magic4.magicard.vo.Department;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepo extends JpaRepository<Department, Integer> {
    @Query(value = "select department_info.membernum, department_info.department_id, department_info.department_name, "
            +
            "department_info.is_admin_department, department_info.super_department_name, " +
            "department_info.top_department_name, manager_info.rank_priority, manager_info.employee_email, " +
            "manager_info.employee_code, manager_info.employee_name  from " +
            "(select dept_superdept_info.*, topdept.department_name as top_department_name from " +
            "(select tm.*, super.department_name as super_department_name, " +
            "super.super_department_id as dept_superdept_info_superdept_id from " +
            "(select count(e.employee_code) as membernum, d.department_id as department_id, " +
            "d.department_name as department_name, d.is_admin_department, " +
            "d.super_department_id as super_department_id " +
            "from department d " +
            "left join employee e " +
            "on d.department_id = e.department_id " +
            "group by d.department_id, d.department_name, d.super_department_id, d.is_admin_department " +
            "order by d.department_id) as tm " +
            "left join department super " +
            "on tm.super_department_id = super.department_id) as dept_superdept_info " +
            "left join department topdept " +
            "on dept_superdept_info.dept_superdept_info_superdept_id = topdept.department_id) " +
            "as department_info " +
            "left join (" +
            "select ee.rank_priority, ee.employee_email as employee_email, " +
            "ee.employee_code as employee_code, ee.employee_name as employee_name, " +
            "emin.department_name as department_name2, emin.department_id as edepartment_id " +
            "from employee ee " +
            "join ( " +
            "SELECT MIN(e.rank_priority) as rank_priority, d.department_id, " +
            "d.is_admin_department as is_admin_department, d.department_name, " +
            "d.super_department_id as bb " +
            "FROM department d JOIN employee e ON d.department_id = e.department_id GROUP BY d.department_id " +
            ") as emin " +
            "on emin.rank_priority = ee.rank_priority " +
            "where emin.rank_priority = ee.rank_priority and ee.department_id = emin.department_id " +
            ") as manager_info " +
            "on department_info.department_id = manager_info.edepartment_id", nativeQuery = true)
    List<Map<String, Object>> selectAllList();

    @Query(value = "select department_info.membernum, department_info.department_id, department_info.department_name, "
            +
            "department_info.is_admin_department, department_info.super_department_name, " +
            "department_info.top_department_name, manager_info.rank_priority, manager_info.employee_email, " +
            "manager_info.employee_code, manager_info.employee_name  from " +
            "(select dept_superdept_info.*, topdept.department_name as top_department_name from " +
            "(select tm.*, super.department_name as super_department_name, " +
            "super.super_department_id as dept_superdept_info_superdept_id from " +
            "(select count(e.employee_code) as membernum, d.department_id as department_id, " +
            "d.department_name as department_name, d.is_admin_department, " +
            "d.super_department_id as super_department_id " +
            "from department d " +
            "left join employee e " +
            "on d.department_id = e.department_id " +
            "group by d.department_id, d.department_name, d.super_department_id, d.is_admin_department " +
            "order by d.department_id) as tm " +
            "left join department super " +
            "on tm.super_department_id = super.department_id) as dept_superdept_info " +
            "left join department topdept " +
            "on dept_superdept_info.dept_superdept_info_superdept_id = topdept.department_id) " +
            "as department_info " +
            "left join (" +
            "select ee.rank_priority, ee.employee_email as employee_email, " +
            "ee.employee_code as employee_code, ee.employee_name as employee_name, " +
            "emin.department_name as department_name2, emin.department_id as edepartment_id " +
            "from employee ee " +
            "join ( " +
            "SELECT MIN(e.rank_priority) as rank_priority, d.department_id, " +
            "d.is_admin_department as is_admin_department, d.department_name, " +
            "d.super_department_id as bb " +
            "FROM department d JOIN employee e ON d.department_id = e.department_id GROUP BY d.department_id " +
            ") as emin " +
            "on emin.rank_priority = ee.rank_priority " +
            "where emin.rank_priority = ee.rank_priority and ee.department_id = emin.department_id " +
            ") as manager_info " +
            "on department_info.department_id = manager_info.edepartment_id" +
            "where department_id = :departmentId", nativeQuery = true)
    List<Map<String, Object>> findByDeptId(Integer departmentId);
}
