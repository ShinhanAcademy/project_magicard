package com.magic4.magicard.service;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.magic4.magicard.dto.GptResultDto;
import com.magic4.magicard.dto.PaymentInfoDto;
import com.magic4.magicard.repository.ApprovalStepsRepo;
import com.magic4.magicard.repository.PaymentInfoRepo;
import com.magic4.magicard.repository.PurposeCategoryRepo;
import com.magic4.magicard.repository.RequestRepo;
import com.magic4.magicard.vo.ApprovalSteps;
import com.magic4.magicard.vo.PaymentInfo;
import com.magic4.magicard.vo.Request;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class GptService {
    @Value("${openai.api.key}")
    private String secretKey;
    private final RestTemplate restTemplate;
    private static final String END_POINT = "https://api.openai.com/v1/chat/completions";

    @Autowired
    private RequestRepo requestRepo;

    @Autowired
    private ApprovalStepsRepo approvalStepsRepo;

    @Autowired
    private PaymentInfoRepo paymentInfoRepo;

    @Autowired
    private PurposeCategoryRepo purposeCategoryRepo;

    public GptService(RestTemplateBuilder restTemplateBuilder, ObjectMapper objectMapper) {
        this.restTemplate = restTemplateBuilder.build();
    }

    public List<GptResultDto> getGptResponse(Integer paymentId) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + secretKey);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-3.5-turbo");
        PaymentInfo paymentInfo = paymentInfoRepo.findById(paymentId).orElse(null);
        assert (paymentInfo != null);

        int payAmount = paymentInfo.getPayAmount();
        String merchant = paymentInfo.getMerchant();
        Timestamp paymentTime = paymentInfo.getPaymentTime();

        List<String> messages = new ArrayList<>();
        ApprovalSteps finalApproved = approvalStepsRepo.findById(3).orElse(null); // 최종 승인
        assert (finalApproved != null);

        List<Request> finalApprovedRequests = requestRepo.findByApprovalSteps(finalApproved);

        String gptPromptHeader = "이 카드 결제는 어떤 분류에 들어가야 하는가?" + System.lineSeparator();

        String payInfo = "결제 일시 " + paymentTime + "\r\n" + //
                "사용 금액 : " + payAmount + "\r\n" + //
                "사용처 : '" + merchant + "'\r\n" + //
                "\r\n";

        String body = "위의 카드 결제와 연관성이 높은 3개를 골라 연관이 높은 순서대로 그 번호를 나열하여라. 각 항목은 ','로 구분하여라. " + System.lineSeparator();
        body += "아래의 이력을 참고하여 분류하여라." + System.lineSeparator();
        body += "(결제일시, 사용금액, 사용처) => (소분류 항목)" + System.lineSeparator();

        for (Request r : finalApprovedRequests) {
            body += "(" + r.getPaymentInfo().getPaymentTime() + ", " + r.getPaymentInfo().getPayAmount() + ", "
                    + r.getPaymentInfo().getMerchant() + ") => "
                    // + r.getPurposeItem().getPurposeCategory().getPurposeCategory() + " || "
                    + r.getPurposeItem().getPurposeItem() + System.lineSeparator();
        }

        body += """
                    다음 중 가장 연관성이 높은 3개를 골라 연관이 높은 순서대로 나열하여라.
                    예를 들어 다음과 같이 제시하면 된다.
                    "4, 1, 2"
                    위와 같이 항목은 ','로 구분하여라.
                    답변은 다른 말을 사용하지 말고 단답으로 답하여라.

                    항목들은 다음의 형식으로 제시되어 있다.
                    '(결제일시, 사용금액, 사용처) => (대분류 항목 || 소분류 항목)'
                    고를 수 있는 항목은 다음과 같다.
                """
                + System.lineSeparator();

        String candidates = "";

        // 세션에서 CompanyTicker를 가져와서 사용
        List<Map<String, Object>> categoryItems = purposeCategoryRepo.findCategoryItemPairsByCompanyTicker("SHDS");
        final int len = categoryItems.size();

        List<GptResultDto> candidateDtos = new ArrayList<>();

        for (int i = 0; i < len; i++) {
            Map<String, Object> categoryItem = categoryItems.get(i);

            String category = (String) categoryItem.get("purpose_category");
            String item = (String) categoryItem.get("purpose_item");
            Integer cid = (Integer) categoryItem.get("purpose_category_id");
            Integer iid = (Integer) categoryItem.get("purpose_item_uid");

            GptResultDto gptResultDto = GptResultDto.builder().purposeCategory(category).purposeItem(item)
                    .purposeCategoryId(cid).purposeItemUid(iid).build();
            candidateDtos.add(gptResultDto);

            candidates += (i + 1) + ". " + category + " || " + item;
            if (i < len - 1) {
                candidates += ",";
                candidates += System.lineSeparator();
            }

        }

        String finalMsg = gptPromptHeader + payInfo + body + candidates;

        finalMsg += System.lineSeparator();
        finalMsg += """
                    다시 한번 강조하지만, 답변은 다른 말을 사용하지 말고 단답으로 답하고 3,1,2와 같이 답하여라. 답변에 큰 따옴표(")를 사용하지 말아라
                """;
        ;
        finalMsg += System.lineSeparator();
        System.out.println(finalMsg);
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

        List<?> choices = (List) Arrays.asList(response.getBody().get("choices")).get(0);
        Map<String, Object> messageMap = (Map<String, Object>) choices.get(0);
        List<?> order = Arrays.asList(((Map<String, Object>) messageMap.get("message")).get("content"));
        String orderStr = order.get(0).toString();

        List<GptResultDto> recommendDtos = new ArrayList<>();
        for (String s : orderStr.split(", ")) {
            int idx = Integer.parseInt(s) - 1;
            recommendDtos.add(candidateDtos.get(idx));
        }

        return recommendDtos;
    }
}
