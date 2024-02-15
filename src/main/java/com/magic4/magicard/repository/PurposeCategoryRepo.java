package com.magic4.magicard.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.magic4.magicard.vo.Company;
import com.magic4.magicard.vo.PurposeCategory;

public interface PurposeCategoryRepo extends JpaRepository<PurposeCategory,Integer>{

     //회사에 해당하는 카테고리 찾기
        List<PurposeCategory> findByCompany(Company company);

        //해당 카테고리가 DB에 존재하는지
        PurposeCategory findByPurposeCategory(String purposeCategory);

      
  
}