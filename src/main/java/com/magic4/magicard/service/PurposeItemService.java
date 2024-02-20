package com.magic4.magicard.service;

import com.magic4.magicard.dto.CompanyDto;
import com.magic4.magicard.dto.PurposeItemDto;
import com.magic4.magicard.repository.PurposeCategoryRepo;
import com.magic4.magicard.repository.PurposeItemRepo;
import com.magic4.magicard.vo.Company;
import com.magic4.magicard.vo.PurposeCategory;
import com.magic4.magicard.vo.PurposeItem;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PurposeItemService {
    private ModelMapper model = new ModelMapper();
    private final PurposeCategoryRepo purposeCategoryRepo;
    private final PurposeItemRepo purposeItemRepo;

    public List<PurposeItemDto> getPurposeList(CompanyDto companyDto) {
        Company company = model.map(companyDto, Company.class);
        List<PurposeCategory> purposeCategoryList = purposeCategoryRepo.findAll();
        List<PurposeItemDto> purposeItemDtoList = new ArrayList<>();
        for(PurposeCategory purposeCategory : purposeCategoryList){
            List<PurposeItem> purposeItemList = purposeItemRepo.findByPurposeCategory(purposeCategory);
            for(PurposeItem purposeItem : purposeItemList){
                PurposeItemDto purposeItemDto = PurposeItemDto.builder()
                        .purposeItemUid(purposeItem.getPurposeItemUid())
                                                                .purposeCategory(purposeCategory.getPurposeCategory())
                                                                .purposeItem(purposeItem.getPurposeItem())
                                                                .build();
                purposeItemDtoList.add(purposeItemDto);
            }
        }

        return purposeItemDtoList;
    }
}
