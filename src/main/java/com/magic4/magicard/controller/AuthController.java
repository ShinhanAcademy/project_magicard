package com.magic4.magicard.controller;

import com.magic4.magicard.dto.LoginRequestDto;
import com.magic4.magicard.dto.LoginResponseDto;
import com.magic4.magicard.service.AuthService;
import com.magic4.magicard.service.EmployeeService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final EmployeeService employeeService;
    private final AuthService authService;

    @PostMapping("/login")
    public LoginResponseDto login(HttpServletRequest httpServletRequest){

        LoginRequestDto loginRequestDto=LoginRequestDto.builder()
                .employeeEmail("aa1@anaver.com")
//                .userPassword()
                .build();

        // 세션을 생성하기 전에 기존의 세션 파기
        httpServletRequest.getSession().invalidate();
        HttpSession session = httpServletRequest.getSession();  // Session이 없으면 생성

        LoginResponseDto loginResponseDto=authService.login(loginRequestDto);

        session.setAttribute("myInfo", loginResponseDto);

        return loginResponseDto;
    }

    @GetMapping("/logout")
    public String logout(HttpServletRequest httpServletRequest){


        HttpSession session = httpServletRequest.getSession();

        session.invalidate();

        if (session == null || !httpServletRequest.isRequestedSessionIdValid()) {
            System.out.println("세션이 무효화 상태입니다.");
        }

        return "로그아옷~";
    }
}
