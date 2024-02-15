package com.magic4.magicard.repository;

import com.magic4.magicard.vo.Company;
import com.magic4.magicard.vo.CompanyRegisterRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CompanyRegisterRequestRepo extends JpaRepository<CompanyRegisterRequest, UUID> {
}
