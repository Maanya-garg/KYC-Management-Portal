package com.example.kyc_portal.DTO;

import lombok.Data;

@Data
public class SearchRequestDTO {

    private String idType;
    private String idNumber;
    private String idName;
    private String firstName;
    private String middleName;
    private String lastName;

    private String gender;
    private String dateOfBirth;
}
