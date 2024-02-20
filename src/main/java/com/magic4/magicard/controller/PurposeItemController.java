package com.magic4.magicard.controller;

import com.magic4.magicard.dto.CompanyDto;
import com.magic4.magicard.dto.LoginResponseDto;
import com.magic4.magicard.dto.PurposeItemDto;
import com.magic4.magicard.repository.PurposeCategoryRepo;
import com.magic4.magicard.repository.PurposeItemRepo;
import com.magic4.magicard.service.PurposeItemService;
import com.magic4.magicard.vo.PurposeCategory;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/purpose")
public class PurposeItemController {

    private final PurposeItemService purposeItemService;

    CompanyDto companyDto = CompanyDto.builder().companyName("신한DS").companyTicker("SHDS").build();
    @GetMapping("/getList")
    public List<PurposeItemDto> getPurposeList(HttpServletRequest httpServletRequest){
        return purposeItemService.getPurposeList(companyDto);
    }

}
