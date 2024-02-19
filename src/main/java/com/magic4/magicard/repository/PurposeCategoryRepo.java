package com.magic4.magicard.repository;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.magic4.magicard.vo.Company;
import com.magic4.magicard.vo.PurposeCategory;

public interface PurposeCategoryRepo extends JpaRepository<PurposeCategory, Integer> {
    List<PurposeCategory> findByCompany(Company company);

    @Query(value = "select pc.purpose_category, pi.purpose_item from \r\n" + //
            "purpose_category as pc\r\n" + //
            "join\r\n" + //
            "purpose_item as pi\r\n" + //
            "on pc.purpose_category_id  = pi.purpose_category_id\r\n" + //
            "where company_ticker = :companyTicker", nativeQuery = true)
    List<Map<String, Object>> findCategoryItemPairsByCompanyTicker(@Param("companyTicker") String companyTicker);
}
