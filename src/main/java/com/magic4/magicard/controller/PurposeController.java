package com.magic4.magicard.controller;


import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.magic4.magicard.dto.PurposeAllDto;
import com.magic4.magicard.dto.PurposeDto;
import com.magic4.magicard.service.PurposeService;




@RestController
@RequestMapping("/pur")
public class PurposeController {

    @Autowired
    PurposeService purService;


    //대분류만 가져오기
     @GetMapping("/catelist")
     public List<PurposeDto> getCateList1(){
        return purService.getCateList1();
     };

    // 대분류 소분류  가져오기
    @GetMapping("/list")
    public List<PurposeAllDto> getAllCateList(){
        return purService.getAllCateList();
    };

  
    //대분류 소분류 추가
    @PostMapping("/insert")
    public int inserCategory(@RequestBody Map<String, String> requestData){
    String purposeCategory = requestData.get("purposeCategory");
    String purposeItem = requestData.get("purposeItem");
    return  purService.insertCategory(purposeCategory, purposeItem);
    }

    //소분류 삭제
    @DeleteMapping("/deletepurposeItem")
    public void deleteSubcategory(@RequestBody PurposeDto purposedto) {
        String purposeCategory = purposedto.getPurposeCategory();
        String purposeItem = purposedto.getPurposeItem();
        purService.deleteSubcategory(purposeCategory,purposeItem);
    }

    @DeleteMapping("/deleteAll")
    public void deleteAll(@RequestBody PurposeDto purposedto){
        String purposeCategory = purposedto.getPurposeCategory();
        purService.deletAll(purposeCategory);

    }
}
