package com.magic4.magicard.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.magic4.magicard.dto.PurposeAllDto;
import com.magic4.magicard.dto.PurposeDto;
import com.magic4.magicard.repository.PurposeCategoryRepo;
import com.magic4.magicard.repository.PurposeItemRepo;
import com.magic4.magicard.vo.Company;
import com.magic4.magicard.vo.PurposeCategory;
import com.magic4.magicard.vo.PurposeItem;

@Service
public class PurposeService {


    //대분류 
    @Autowired
    PurposeCategoryRepo purCateRepo;

    //소분류
    @Autowired
    PurposeItemRepo purItemRepo;


    //대분류 소분류 삭제
    @SuppressWarnings("null")
    public void deletAll(String purposeCategory ){
  
        Company company = Company.builder().companyTicker("SHDS").build();

        Optional<PurposeCategory> optionalCategory = purCateRepo.findByCompanyAndPurposeCategory(company,
                purposeCategory);
        if (optionalCategory.isPresent()) {
            PurposeCategory category = optionalCategory.get();
            List<PurposeItem> itemList = purItemRepo.findByPurposeCategory(category);
            purItemRepo.deleteAll(itemList);
            purCateRepo.delete(category);
          }
    }


     //소분류 삭제
    @SuppressWarnings("null")
    public void deleteSubcategory(String purposeCategory,String purposeItem){

      Company company = Company.builder().companyTicker("SHDS").build();

      Optional<PurposeCategory> optionalCategory = purCateRepo.findByCompanyAndPurposeCategory(company, purposeCategory);

      if(optionalCategory.isPresent()){
        PurposeCategory category = optionalCategory.get();
        List<PurposeItem> itemList = purItemRepo.findByPurposeCategoryAndPurposeItem(category, purposeItem);
        itemList.forEach(subcategory -> purItemRepo.delete(subcategory));
      }
    }

    //대분류 조회
    public List<PurposeDto> getCateList1(){

      List<PurposeDto> purposeDtoList = new ArrayList<>();

      Company company = Company.builder().companyTicker("SHDS").build();

      List<PurposeCategory> cateList =   purCateRepo.findByCompany(company);

      for(int i = 0 ;  i < cateList.size() ; i ++){
        PurposeDto purposeDto = new PurposeDto();
        purposeDto.setPurposeCategory(cateList.get(i).getPurposeCategory());
        purposeDtoList.add(purposeDto);
       }
      return purposeDtoList;
    }

     // 대분류 , 소분류 조회
    public List<PurposeAllDto> getAllCateList(){

      List<PurposeAllDto> purposeDtoList = new ArrayList<>();

      Company company = Company.builder().companyTicker("SHDS").build();

      List<PurposeCategory> cateList =   purCateRepo.findByCompany(company);

      List<PurposeItem> itemList = purItemRepo.findAllByPurposeCategoryIn(cateList);

      for(int i = 0  ; i < cateList.size() ; i ++){

        PurposeAllDto PurposeAllDto = new PurposeAllDto();
        PurposeAllDto.setPurposeCategory(cateList.get(i).getPurposeCategory());

        List<String> itemlist2 = new ArrayList<>();
        for(int j = 0 ; j < itemList.size() ; j++){
           if(itemList.get(j).getPurposeCategory().getPurposeCategoryId() == cateList.get(i).getPurposeCategoryId()){
            itemlist2.add(itemList.get(j).getPurposeItem());
           }
        }
        PurposeAllDto.setPurposeItem(itemlist2);
        purposeDtoList.add(PurposeAllDto);
    }
      return purposeDtoList;
    };



    // 대분류 입력
    @SuppressWarnings("null")
    public int insertCategory(String purposeCategory, String  purposeItem){

         Company company = Company.builder().companyTicker("SHDS").build();

         PurposeCategory  existingCategory  = purCateRepo.findByPurposeCategory(purposeCategory);

         PurposeItem existingItem = purItemRepo.findByPurposeItem(purposeItem);

         if(existingCategory == null && existingItem == null){
          PurposeCategory category = PurposeCategory.builder().company(company).purposeCategory(purposeCategory).build();
          purCateRepo.save(category);
          PurposeItem item = PurposeItem.builder().purposeCategory(category).purposeItem(purposeItem).build();
          purItemRepo.save(item);
          return 2;
         }
         else if(existingCategory != null  && existingItem == null){
          PurposeItem item = PurposeItem.builder().purposeCategory(existingCategory).purposeItem(purposeItem).build();
          purItemRepo.save(item);
          return 1;
         }
         else {
          return 0;
         }
    }
    
}