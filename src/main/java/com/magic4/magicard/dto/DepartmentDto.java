package com.magic4.magicard.dto;

import com.magic4.magicard.vo.Department;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class DepartmentDto {
    private int departmentId;
    private String departmentName;
    private boolean isAdminDepartment;
    private int superDepartmentId;
}
