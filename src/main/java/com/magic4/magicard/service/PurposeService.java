package com.magic4.magicard.service;

import java.util.ArrayList;
import java.util.List;

import javax.xml.crypto.KeySelector.Purpose;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.magic4.magicard.dto.PurposeDto;
import com.magic4.magicard.dto.PurposeDto2;
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


    @SuppressWarnings("null")
    public void deleteSubcategory(String subcategory,String category){
      Company company = Company.builder()
      .companyTicker("SHDS").build();

      List<PurposeCategory> cateList =   purCateRepo.findByCompany(company);

      PurposeCategory purposecategory = null ;

      PurposeItem purposeitem = null;

      for(int i = 0 ;  i < cateList.size() ; i++){
         if( cateList.get(i).getPurposeCategory().equals(category)){
          purposecategory  =   cateList.get(i);
          break;
         }
      }

      List<PurposeItem> purposeitemlist = purItemRepo.findByPurposeCategory(purposecategory);

      for(int i = 0 ; i <purposeitemlist.size() ; i++){
        if(purposeitemlist.get(i).getPurposeItem().equals(subcategory)){
          purposeitem =  purposeitemlist.get(i);
        }
      }
      purItemRepo.delete(purposeitem);
    }

    

    


    //대분류 조회
    public List<PurposeDto> getCateList1(){

      List<PurposeDto> purposeDtoList = new ArrayList<>();

      Company company = Company.builder()
      .companyTicker("SHDS").build();

      List<PurposeCategory> cateList =   purCateRepo.findByCompany(company);

      for(int i = 0 ;  i < cateList.size() ; i ++){
        PurposeDto purposeDto = new PurposeDto();
        purposeDto.setPurposeCategory(cateList.get(i).getPurposeCategory());
        purposeDtoList.add(purposeDto);
       }

      return purposeDtoList;
    }

      // 대분류 , 소분류 조회
    public List<PurposeDto2> getAllCateList(){

      
      // // 대분류  + 소분류 DTO List
      // List<PurposeDto> purposeDtoList = new ArrayList<>();

      // //Login 한 Company 정보 
      // Company company = Company.builder()
      // .companyTicker("SHDS").build();

  
      // //대분류 조회
      // List<PurposeCategory> cateList =   purCateRepo.findByCompany(company);

      // List<PurposeItem> itemList = purItemRepo.findAllByPurposeCategoryIn(cateList);


      // for(int i = 0 ;  i < itemList.size() ; i ++){
      //      PurposeDto purposeDto = new PurposeDto();
      //      purposeDto.setPurposeCategory(itemList.get(i).getPurposeCategory().getPurposeCategory());
      //      purposeDto.setPurposeItem(itemList.get(i).getPurposeItem());
      //      purposeDtoList.add(purposeDto);
      // }

      List<PurposeDto2> purposeDtoList = new ArrayList<>();

      Company company = Company.builder().companyTicker("SHDS").build();

      List<PurposeCategory> cateList =   purCateRepo.findByCompany(company);

      List<PurposeItem> itemList = purItemRepo.findAllByPurposeCategoryIn(cateList);


      for(int i = 0  ; i < cateList.size() ; i ++){

        PurposeDto2 purposeDto2 = new PurposeDto2();
        purposeDto2.setPurposeCategory(cateList.get(i).getPurposeCategory());

        List<String> itemlist2 = new ArrayList<>();
        for(int j = 0 ; j < itemList.size() ; j++){
           if(itemList.get(j).getPurposeCategory().getPurposeCategoryId() == cateList.get(i).getPurposeCategoryId()){
            itemlist2.add(itemList.get(j).getPurposeItem());
           }
        }

        purposeDto2.setPurposeItem(itemlist2);
        purposeDtoList.add(purposeDto2);
    }


      return purposeDtoList;
    };





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