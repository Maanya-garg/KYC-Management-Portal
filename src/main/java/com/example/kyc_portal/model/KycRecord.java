package com.example.kyc_portal.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

@Data
@Entity
public class KycRecord {

    @Id
    @NotBlank
    private String idNumber;
    @NotBlank

    private String idType;
    private String clientType;

    private String prefix;
    @NotBlank

    private String firstName;
    private String middleName;
    private String lastName;

    private String relationshipType;

    private String relatedPersonFirstName;
    private String relatedPersonMiddleName;
    private String relatedPersonLastName;

    private String gender;
    private String dateOfBirth;
    @Size(min = 10, max = 10)

    private String mobileNumber;
    @Email
    private String emailAddress;

    private String addressLine1;
    private String city;
    private String district;
    private String state;
    private String country;
    private String pinCode;

    private String correspondenceAddressLine1;
    private String correspondenceCity;
    private String correspondenceDistrict;
    private String correspondenceState;
    private String correspondenceCountry;
    private String correspondencePinCode;
}
