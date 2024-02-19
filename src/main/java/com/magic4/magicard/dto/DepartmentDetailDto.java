package com.magic4.magicard.dto;

import java.math.BigInteger;

public interface DepartmentDetailDto {

    
      // public BigInteger memberNum;
    // public Integer departmentId;
    // public String departmentName;
    // public String adminDepartment;
    // public String superDepartmentName;
    // public String topDepartmentName;
    // public Integer rankPriority;
    // public String employeeEmail;
    // public String employeeCode;
    // public String employeeName;


    public BigInteger getMemberNum(); 
    public Integer getDepartmentId(); 
    public String getDepartmentName();
    public String getAdminDepartment() ;
    public String getSuperDepartmentName() ;
    public String getTopDepartmentName(); 
    public Integer getRankPriority() ;
    public String getEmployeeEmail() ;
    public String getEmployeeCode() ;
    public String getEmployeeName() ;
  
    public void setMemberNum(BigInteger memberNum);
    public void setDepartmentId(Integer departmentId);
    public void setDepartmentName(String departmentName);
    public void setAdminDepartment(String adminDepartment);
    public void setSuperDepartmentName(String superDepartmentName);
    public void setTopDepartmentName(String topDepartmentName);
    public void setRankPriority(Integer rankPriority) ;
    public void setEmployeeEmail(String employeeEmail);
    public void setEmployeeCode(String employeeCode) ;
    public void setEmployeeName(String employeeName) ;
    
}
