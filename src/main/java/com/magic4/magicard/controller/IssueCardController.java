package com.magic4.magicard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.magic4.magicard.dto.IssueCardFormDto;
import com.magic4.magicard.service.IssuedCardService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class IssueCardController {
    @Autowired
    private IssuedCardService issuedCardService;

    @PostMapping("/issue-card")
    public boolean issueCard(@RequestBody IssueCardFormDto request) {
        log.info("IssueCard...{}", request.toString());
        boolean ret = issuedCardService.handleCardIssueRequest(request);
        log.info("RET=>{}", ret);
        return ret;
    }
}
