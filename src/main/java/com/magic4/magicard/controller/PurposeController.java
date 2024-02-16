package com.magic4.magicard.controller;


import java.util.List;
import java.util.Map;

import javax.xml.crypto.KeySelector.Purpose;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.magic4.magicard.dto.PurposeDto;
import com.magic4.magicard.dto.PurposeDto2;
import com.magic4.magicard.service.PurposeService;
import com.magic4.magicard.vo.Company;
import com.magic4.magicard.vo.PurposeCategory;



@RestController
@RequestMapping("/pur")
public class PurposeController {

    @Autowired
    PurposeService purService;


    //대분류만 가져오기
     @GetMapping("/catelist.do")
     public List<PurposeDto> getCateList1(){
        return purService.getCateList1();
     };

    // 대분류 소분류  가져오기
    @GetMapping("/list.do")
    public List<PurposeDto2> getAllCateList(){
        return purService.getAllCateList();
    };

  
    @PostMapping("/insert.do")
    public int inserCategory(@RequestBody Map<String, String> requestData){
    String purposeCategory = requestData.get("purposeCategory");
    String purposeItem = requestData.get("purposeItem");
    return  purService.insertCategory(purposeCategory, purposeItem);
    }

    @DeleteMapping("/deletepurposeItem.do")
    public void deleteSubcategory(@RequestBody PurposeDto purposedto) {
        String purposeCategory = purposedto.getPurposeCategory();
        String purposeItem = purposedto.getPurposeItem();
        purService.deleteSubcategory(purposeCategory,purposeItem);
    }
}
