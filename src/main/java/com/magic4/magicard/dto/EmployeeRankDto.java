package com.magic4.magicard.dto;


import com.magic4.magicard.vo.Company;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeRankDto{
    private int employeeRankId;
    private Company company;
    private int rankPriority;
    private String rankName;
}
