package com.magic4.magicard.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.magic4.magicard.repository.PurposeCategoryRepo;
import com.magic4.magicard.vo.PurposeCategory;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class GptService {
    @Value("${openai.api.key}")
    private String secretKey;
    private final RestTemplate restTemplate;
    private static final String END_POINT = "https://api.openai.com/v1/chat/completions";
    private final ObjectMapper objectMapper;

    @Autowired
    private PurposeCategoryRepo purposeCategoryRepo;

    @Autowired
    public GptService(RestTemplateBuilder restTemplateBuilder, ObjectMapper objectMapper) {
        this.restTemplate = restTemplateBuilder.build();
        this.objectMapper = objectMapper;
    }

    public List<Map<String, Object>> getPurposes() {
        return purposeCategoryRepo.findCategoryItemPairsByCompanyTicker("SHDS");
    }

    public String getGptResponse() {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + secretKey);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-3.5-turbo");

        List<String> messages = new ArrayList<>();
        String gptPromptHeader = "이 카드 결제는 어떤 분류에 들어가야 하는가?" + System.lineSeparator();
        String payInfo = "결제 일시 2024-02-08:12:30:05\r\n" + //
                "사용 금액 : 7000\r\n" + //
                "사용처 : '롯데리아 연남점'\r\n" + //
                "\r\n";
        String body = "다음 중 가장 연관성이 높은 3개를 골라 연관이 높은 순서대로 나열하여라. 각 항목은 ','로 구분하여라" + System.lineSeparator();

        String candidates = "";

        List<Map<String, Object>> categoryItems = purposeCategoryRepo.findCategoryItemPairsByCompanyTicker("SHDS");
        for (Map<String, Object> ci : categoryItems) {
            String category = (String) ci.get("purpose_category");
            String item = (String) ci.get("purpose_item");

            candidates += category + " || " + item + "\"\r\n";

        }

        String finalMsg = gptPromptHeader + payInfo + body + candidates;
        // String body = "다음 중 하나를 골라 단답형으로 대답해라. 예를 들어 \"인건비||급여\"에 속한다면 \"인건비||급여\" 만
        // 제시하고 다른 말은 하지 말아라." + System.lineSeparator();
        messages.add(finalMsg);

        List<Map<String, String>> messagesList = new ArrayList<>();
        for (String message : messages) {
            Map<String, String> messageMap = new HashMap<>();
            messageMap.put("role", "user");
            messageMap.put("content", message);
            messagesList.add(messageMap);
        }

        requestBody.put("messages", messagesList);
        requestBody.put("temperature", 1.0f);
        requestBody.put("max_tokens", 500);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(END_POINT, requestEntity, Map.class);
        return response.toString();
    }
}
