package com.magic4.magicard.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class LoginRequestDto {

    private String employeeEmail;

//    private String userPassword;
}
