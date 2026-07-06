package com.example.kyc_portal.repository;

import com.example.kyc_portal.model.KycRecord;
import lombok.Data;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Optional;

public interface KycRepository extends JpaRepository<KycRecord,String> {
    @Query("""
            SELECT k
            FROM KycRecord k
            WHERE
            k.idType = :idType
            AND k.idName=:idName
            AND k.idNumber = :idNumber
            AND LOWER(k.firstName) = LOWER(:firstName)
            AND LOWER(k.lastName) = LOWER(:lastName)
            AND k.gender = :gender
            AND k.dateOfBirth = :dateOfBirth
            """)
    Optional<KycRecord> searchKyc(
            @Param("idType") String idType,
            @Param("idName") String idName,
            @Param("idNumber") String idNumber,
            @Param("firstName") String firstName,
            @Param("lastName") String lastName,
            @Param("gender") String gender,
            @Param("dateOfBirth") LocalDate dateOfBirth
    );

    Optional<KycRecord> findByIdNumber(String idNumber);
}
