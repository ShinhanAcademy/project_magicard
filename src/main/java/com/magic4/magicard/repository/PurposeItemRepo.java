package com.magic4.magicard.repository;

import java.util.*;

import com.magic4.magicard.vo.PurposeCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import com.magic4.magicard.vo.PurposeItem;

public interface PurposeItemRepo extends JpaRepository<PurposeItem,Integer>{
  PurposeItem findByPurposeItem(String purposeItem);
  List<PurposeItem> findByPurposeCategory(PurposeCategory purposeCategory);
}
