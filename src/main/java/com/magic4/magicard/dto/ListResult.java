package com.magic4.magicard.dto;

import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@ToString
public class ListResult<T> extends Result {
    private List<T> data;
    private boolean hasNext;
}