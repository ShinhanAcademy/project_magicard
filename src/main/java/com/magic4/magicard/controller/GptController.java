package com.magic4.magicard.controller;

import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.magic4.magicard.dto.GptResultDto;
import com.magic4.magicard.service.GptService;

@RestController
public class GptController {
    @Autowired
    private GptService gptService;

<<<<<<< HEAD
    @GetMapping("/gpt/recommend/{paymentId}")
    public List<GptResultDto> gptRecommend(@PathVariable("paymentId") Integer paymentId) {
=======

    @GetMapping("/gpt/recommend/{selectedPaymentId}")
    public List<GptResultDto> gptRecommend(@PathVariable("selectedPaymentId") Integer paymentId) {
>>>>>>> 2704ab83e7967fa39c06311163a6aaa58a9e10e7
        return gptService.getGptResponse(paymentId);
    }

}
