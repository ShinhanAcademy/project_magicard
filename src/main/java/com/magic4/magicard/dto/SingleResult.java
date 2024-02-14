package com.magic4.magicard.dto;

import lombok.Data;

@Data
public class SingleResult<T> extends Result {
    private T data;
}
