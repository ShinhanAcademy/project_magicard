package com.magic4.magicard.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.magic4.magicard.service.GptService;

@RestController
public class GptTestController {
    @Autowired
    private GptService gptService;

    @GetMapping("/gpt/test")
    public String gptTest() {
        return gptService.getGptResponse();
    }

    @GetMapping("/gpt/test/purpose")
    public List<Map<String, Object>> gptTestPurpose() {
        return gptService.getPurposes();
    }
}
