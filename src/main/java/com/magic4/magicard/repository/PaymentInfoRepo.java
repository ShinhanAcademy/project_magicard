package com.magic4.magicard.repository;

import java.sql.Timestamp;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.magic4.magicard.vo.IssuedCard;
import com.magic4.magicard.vo.PaymentInfo;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface PaymentInfoRepo extends JpaRepository<PaymentInfo, Integer> {
  List<PaymentInfo> findByIssuedCardOrderByPaymentTimeDesc(IssuedCard issuedCard);
  @Query("SELECT p FROM PaymentInfo p WHERE p.issuedCard = :issuedCard AND YEAR(p.paymentTime) = YEAR(CURRENT_DATE()) AND MONTH(p.paymentTime) = MONTH(CURRENT_DATE())")
  List<PaymentInfo> findByIssuedCardAndThisMonth(@Param("issuedCard") IssuedCard issuedCard);

//  PaymentInfo findByPaymentId(Integer paymentId);
}
