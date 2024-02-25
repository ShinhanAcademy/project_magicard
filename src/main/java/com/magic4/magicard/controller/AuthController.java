package com.magic4.magicard.controller;

import com.magic4.magicard.dto.LoginRequestDto;
import com.magic4.magicard.dto.LoginResponseDto;
import com.magic4.magicard.service.AuthService;
import com.magic4.magicard.service.EmployeeService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final EmployeeService employeeService;
    private final AuthService authService;

    @PostMapping("/login")
    public LoginResponseDto login(@RequestBody LoginRequestDto loginRequestDto, HttpServletRequest httpServletRequest){

//        LoginRequestDto loginRequestDto=LoginRequestDto.builder()
//                // 상급자
////                .employeeEmail("aa4@naver.com")
//                // 상급자의 상급자
////                .employeeEmail("aa11@naver.com")
//                // 관리자
//                .employeeEmail("sdbase@naver.com")
////                .userPassword()
//                .build();

        // 세션을 생성하기 전에 기존의 세션 파기
        httpServletRequest.getSession().invalidate();
        HttpSession session = httpServletRequest.getSession();  // Session이 없으면 생성

        LoginResponseDto loginResponseDto=authService.login(loginRequestDto);

        session.setAttribute("myInfo", loginResponseDto);

        return loginResponseDto;
    }


    @PostMapping("/adminLogin")
    public LoginResponseDto adminLogin(HttpServletRequest httpServletRequest){

        LoginRequestDto loginRequestDto=LoginRequestDto.builder()
                .employeeEmail("aa3@naver.com")
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
