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

    @GetMapping("/gpt/recommend/{paymentId}")
    public List<GptResultDto> gptRecommend(@PathVariable("paymentId") Integer paymentId) {
        return gptService.getGptResponse(paymentId);
    }

}
