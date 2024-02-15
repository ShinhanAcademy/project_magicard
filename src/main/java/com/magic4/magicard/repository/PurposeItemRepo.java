package com.magic4.magicard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.magic4.magicard.vo.PurposeCategory;
import com.magic4.magicard.vo.PurposeItem;

public interface PurposeItemRepo extends JpaRepository<PurposeItem,Integer>{
    List<PurposeItem> findByPurposeCategory(PurposeCategory purposeCategory);

    //상위카테고리가 포함된 소분류 조회
    List<PurposeItem> findAllByPurposeCategoryIn(List<PurposeCategory> purposeCategory);

    //해당 Item이 DB에 존재하는지
    PurposeItem findByPurposeItem(String purposeItem);

    

}