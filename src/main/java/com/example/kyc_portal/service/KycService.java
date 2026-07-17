package com.example.kyc_portal.service;

import com.example.kyc_portal.DTO.SearchRequestDTO;
import com.example.kyc_portal.model.KycRecord;
import com.example.kyc_portal.repository.KycRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class KycService {
    @Autowired
    KycRepository repo;
    public KycRecord createKyc(KycRecord record) {
        return repo.save(record);
    }

    public List<KycRecord> getAllKyc() {
        return repo.findAll();
    }

    public KycRecord updateKyc(String idNumber, KycRecord updatedRecord){

        Optional<KycRecord> existingRecord =
                repo.findByIdNumber(idNumber);

        if(existingRecord.isPresent()){

            KycRecord record = existingRecord.get();

            record.setClientType(updatedRecord.getClientType());
            record.setIdType(updatedRecord.getIdType());
            record.setIdName(updatedRecord.getIdName());
            record.setFirstName(updatedRecord.getFirstName());
            record.setMiddleName(updatedRecord.getMiddleName());
            record.setLastName(updatedRecord.getLastName());

            record.setGender(updatedRecord.getGender());
            record.setDateOfBirth(updatedRecord.getDateOfBirth());

            record.setRelationshipType(updatedRecord.getRelationshipType());
            record.setRelatedPersonPrefix(
                    updatedRecord.getRelatedPersonPrefix());
            record.setRelatedPersonFirstName(
                    updatedRecord.getRelatedPersonFirstName());

            record.setRelatedPersonMiddleName(
                    updatedRecord.getRelatedPersonMiddleName());

            record.setRelatedPersonLastName(
                    updatedRecord.getRelatedPersonLastName());

            record.setMobileNumber(
                    updatedRecord.getMobileNumber());

            record.setEmailAddress(
                    updatedRecord.getEmailAddress());

            record.setAddressLine1(
                    updatedRecord.getAddressLine1());

            record.setCity(
                    updatedRecord.getCity());

            record.setDistrict(
                    updatedRecord.getDistrict());

            record.setState(
                    updatedRecord.getState());

            record.setCountry(
                    updatedRecord.getCountry());

            record.setPinCode(
                    updatedRecord.getPinCode());

            record.setCorrespondenceAddressLine1(
                    updatedRecord.getCorrespondenceAddressLine1());

            record.setCorrespondenceCity(
                    updatedRecord.getCorrespondenceCity());

            record.setCorrespondenceDistrict(
                    updatedRecord.getCorrespondenceDistrict());

            record.setCorrespondenceState(
                    updatedRecord.getCorrespondenceState());

            record.setCorrespondenceCountry(
                    updatedRecord.getCorrespondenceCountry());

            record.setCorrespondencePinCode(
                    updatedRecord.getCorrespondencePinCode());

            return repo.save(record);
        }

        return null;
    }

    public KycRecord searchKyc(SearchRequestDTO request) {

        LocalDate dateOfBirth = LocalDate
                .parse(request.getDateOfBirth());

        return repo.searchKyc(
                request.getIdType(),
                request.getIdName(),
                request.getIdNumber(),
                request.getFirstName(),
                request.getLastName(),
                request.getGender(),
                dateOfBirth
        ).orElse(null);
    }
    public KycRecord getKycByIdNumber(String idNumber){

        return repo.findByIdNumber(idNumber)
                .orElse(null);
    }
}
