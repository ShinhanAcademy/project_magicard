package com.magic4.magicard.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.magic4.magicard.dto.DepartmentDetailDto;
import com.magic4.magicard.repository.DepartmentRepo;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/department")
public class DepartmentController {
    @Autowired
    private DepartmentRepo deptRepo;

    @GetMapping("/listall")
    public List<Map<String, Object>> selectAllList() {
        Object temp = deptRepo.selectAllList();
        log.info("********" + temp);
        List<Map<String, Object>> deptList = deptRepo.selectAllList();
        return deptList;

    }

    @GetMapping("/detailinfo/{departmentId}")
    public DepartmentDetailDto findByDeptId(@PathVariable(name = "departmentId") Integer departmentId) {
        
        return deptRepo.findByDeptId(departmentId);
    }
}