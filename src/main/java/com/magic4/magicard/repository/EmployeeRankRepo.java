package com.magic4.magicard.repository;

import com.magic4.magicard.vo.Company;
import com.magic4.magicard.vo.EmployeeRank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRankRepo extends JpaRepository<EmployeeRank, Integer> {

    // 회사별 직급 조회
    List<EmployeeRank> findEmployeeRanksByCompany(Company company);
    List<EmployeeRank> findByCompany(Company company);

}
