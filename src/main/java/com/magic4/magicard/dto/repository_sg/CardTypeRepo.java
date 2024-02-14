package com.magic4.magicard.dto.repository_sg;

import org.springframework.data.repository.CrudRepository;

import com.magic4.magicard.vo.CardType;

public interface CardTypeRepo extends CrudRepository<CardType, String> {
}
