package com.example.kyc_portal.repository;

import com.example.kyc_portal.model.KycRecord;
import lombok.Data;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface KycRepository extends JpaRepository<KycRecord,String> {
    @Query("""
            SELECT k
            FROM KycRecord k
            WHERE
            k.idType = :idType
            AND k.idNumber = :idNumber
            AND k.firstName = :firstName
            AND k.middleName = :middleName
            AND k.lastName = :lastName
            AND k.gender = :gender
            AND k.dateOfBirth = :dateOfBirth
            """)
    Optional<KycRecord> searchKyc(
            @Param("idType") String idType,
            @Param("idNumber") String idNumber,
            @Param("firstName") String firstName,
            @Param("middleName") String middleName,
            @Param("lastName") String lastName,
            @Param("gender") String gender,
            @Param("dateOfBirth") String dateOfBirth
    );

    Optional<KycRecord> findByIdNumber(String idNumber);
}
