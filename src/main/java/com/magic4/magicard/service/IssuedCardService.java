package com.magic4.magicard.service;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Random;
import java.util.UUID;


import com.magic4.magicard.dto.CardInfoDto;
import com.magic4.magicard.repository.EmployeeRepo;
import com.magic4.magicard.dto.EmployeeEmailDto;
import com.magic4.magicard.vo.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.magic4.magicard.dto.IssueCardFormDto;
import com.magic4.magicard.dto.repository_sg.CardTypeRepo;
import com.magic4.magicard.repository.IssuedCardRepo;
import com.magic4.magicard.vo.CardType;
import com.magic4.magicard.vo.IssuedCard;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class IssuedCardService {
    @Autowired
    private IssuedCardRepo issuedCardRepo;

    @Autowired
    private CardTypeRepo cardTypeRepo;

    @Autowired
    private EmployeeRepo employeeRepo;

    public boolean handleCardIssueRequest(IssueCardFormDto issueCardFormDto) {

        long currentTimeMillis = System.currentTimeMillis();
        Date currentDate = new Date(currentTimeMillis);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDate);
        calendar.add(Calendar.YEAR, 5);
        Date expireDate = new Date(calendar.getTimeInMillis());

        Timestamp expireTimestamp = new Timestamp(expireDate.getTime());
        int maxLimit = issueCardFormDto.getMaxLimit();
        int cardCount = issueCardFormDto.getCardCount();
        String cardCode = issueCardFormDto.getCardCode();
        CardType cardType = cardTypeRepo.findById(cardCode).orElse(null);

        assert (cardType != null);

        for (int i = 0; i < cardCount; ++i) {
            String cardCvc = generateCardCvc();
            String cardNumber = generateCardNumber();
            IssuedCard issuedCard = IssuedCard.builder()
                    .cardCvc(Integer.parseInt(cardCvc))
                    .cardNumber(cardNumber)
                    .maximumAmount(maxLimit)
                    .expireDate(expireTimestamp)
                    .cardType(cardType)
                    .issuedCardId(UUID.randomUUID())
                    .status("사용대기")
                    .build();

            try {
                log.info("To Save...{}", issuedCard.toString());
                issuedCardRepo.save(issuedCard);
            } catch (Exception e) {
                log.error(e.toString());
                return false;
            }
        }

        return true;
    }

    private static String generateCardCvc() {
        Random random = new Random();
        StringBuilder cvc = new StringBuilder();

        for (int i = 0; i < 3; i++) {
            int digit = random.nextInt(10); // 0부터 9까지의 임의의 숫자 생성
            cvc.append(digit);
        }

        return cvc.toString();
    }

    private static String generateCardNumber() {
        Random random = new Random();
        StringBuilder cardNumber = new StringBuilder();

        for (int i = 0; i < 16; i++) {
            if (i > 0 && i % 4 == 0) {
                cardNumber.append('-'); // 매 4자리마다 '-' 추가
            }
            int digit = random.nextInt(10); // 0부터 9까지의 임의의 숫자 생성
            cardNumber.append(digit);
        }

        return cardNumber.toString();
    }


    public CardInfoDto getMyCardInfo(String empEmail){
        Employee emp=employeeRepo.findById(empEmail).orElse(null);
        IssuedCard issuedCard= issuedCardRepo.findByEmployee(emp);

        return CardInfoDto.builder()
                .issuedCardId(issuedCard.getIssuedCardId())
                .CardCode(issuedCard.getCardType().getCardCode())
                .minimumAmount(issuedCard.getCardType().getMinimumAmount())
                .CardName(issuedCard.getCardType().getCardName())
                .cardNumber(issuedCard.getCardNumber())
                .cardCvc(issuedCard.getCardCvc())
                .expireDate(issuedCard.getExpireDate())
                .status(issuedCard.getStatus())
                .maximumAmount(issuedCard.getMaximumAmount())
                .cardBenefit(issuedCard.getBenefit())
                .build();
    }
    
    public Long totalCards(EmployeeEmailDto employeeEmail){
        return issuedCardRepo.totalCards(changeDtoToEntity(employeeEmail).getEmployeeEmail());
    }

    private Employee changeDtoToEntity(EmployeeEmailDto employeeEmail) {
        Employee employeeEmailEntity= Employee
                .builder()
                .employeeEmail(employeeEmail.getEmployeeEmail())
                .build();

        return employeeEmailEntity;

    }
}
