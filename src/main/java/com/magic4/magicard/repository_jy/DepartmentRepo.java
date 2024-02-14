package com.magic4.magicard.repository_jy;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.magic4.magicard.vo.Department;

public interface DepartmentRepo extends JpaRepository<Department, Integer>{
    @Query(value = "select membernum, tmid as department_id, rank_priority, employee_email, employee_code, employee_name, real_super_department_id as super_department_id, is_admin_department, department_name as super_department_name, department_name1 as department_name from (select count(e.employee_code) as membernum, d.department_id as tmid, d.department_name as department_name1 from department d left join employee e on d.department_id = e.department_id group by d.department_id, d.department_name order by d.department_id) as tm left join (select * from( select ee.rank_priority, ee.employee_email as employee_email, ee.employee_code as employee_code, ee.employee_name as employee_name, emin.department_name as department_name2, emin.department_id as smiid, emin.bb as real_super_department_id from employee ee join ( SELECT MIN(e.rank_priority) as rank_priority, d.department_id, d.is_admin_department as is_admin_department, d.department_name, d.super_department_id as bb FROM department d JOIN employee e ON d.department_id = e.department_id GROUP BY d.department_id ) as emin on emin.rank_priority = ee.rank_priority where emin.rank_priority = ee.rank_priority and ee.department_id = emin.department_id ) as manager join department on department.department_id = manager.real_super_department_id) as smi on tmid = smiid", nativeQuery = true)
     List<Map<String, Object>> selectAllList();

     @Query(value = "select * from (" +
        "select membernum, tmid as department_id, rank_priority, employee_email, employee_code, employee_name, real_super_department_id as super_department_id, is_admin_department, department_name as super_department_name, department_name1 as department_name " +
            "from (select count(e.employee_code) as membernum, d.department_id as tmid, d.department_name as department_name1 " +
                      "from department d " +
                          "left join employee e " +
                          "on d.department_id = e.department_id " +
                      "group by d.department_id, d.department_name " +
                      "order by d.department_id " +
                     ") as tm " +
            "left join (select * " +
                           "from( select ee.rank_priority, ee.employee_email as employee_email, ee.employee_code as employee_code, ee.employee_name as employee_name, emin.department_name as department_name2, emin.department_id as smiid, emin.bb as real_super_department_id " +
                                         "from employee ee " +
                                             "join ( SELECT MIN(e.rank_priority) as rank_priority, d.department_id, d.is_admin_department as is_admin_department, d.department_name, d.super_department_id as bb " +
                                                      "FROM department d " +
                                                          "JOIN employee e " +
                                                          "ON d.department_id = e.department_id " +
                                                      "GROUP BY d.department_id ) as emin " +
                                             "on emin.rank_priority = ee.rank_priority " +
                                         "where emin.rank_priority = ee.rank_priority and ee.department_id = emin.department_id ) as manager " +
                           "join department on department.department_id = manager.real_super_department_id) as smi " +
            "on tmid = smiid " +
            ") as dept_list_info " +
            "left join " +
            "(select department_id as top_department_id, department_name as top_department_name from " +
            "department) as ddd " +
            "on dept_list_info.super_department_id = top_department_id " +
        "where department_id = :departmentId", nativeQuery=true)
        List<Map<String, Object>> findByDeptId(Integer departmentId);
}
