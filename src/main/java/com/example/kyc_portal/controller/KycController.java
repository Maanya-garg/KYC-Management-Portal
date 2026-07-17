package com.example.kyc_portal.controller;

import com.example.kyc_portal.DTO.SearchRequestDTO;
import com.example.kyc_portal.model.KycRecord;
import com.example.kyc_portal.service.KycService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.apache.catalina.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;
import java.util.Optional;
@Tag(name = "KYC Management APIs", description = "Operations for creating, searching, and updating KYC records")
@RequestMapping("/api/kyc")
@RestController

public class KycController {
    @Autowired
    KycService service;
    @GetMapping("/kyc")
    public List<KycRecord> getAllKyc() {
        return service.getAllKyc();
    }
    @Operation(summary = "Create a new KYC Record")
    @PostMapping("/create")
    public KycRecord createKyc(@RequestBody KycRecord record) {
        return service.createKyc(record);
    }
    @Operation(summary = "Search an existing KYC Record")
    @PostMapping("/search")
    public KycRecord searchKyc(@RequestBody SearchRequestDTO request)
    {
        return service.searchKyc(request);
    }
    @Operation(summary = "Update an existing KYC Record")
    @PutMapping("/update/{idNumber}")
    public KycRecord updateKyc(
            @PathVariable String idNumber,
            @RequestBody KycRecord updatedRecord){

        return service.updateKyc(idNumber, updatedRecord);
    }
    @GetMapping("/search/{idNumber}")
    public KycRecord getKycByIdNumber(
            @PathVariable String idNumber){

        return service.getKycByIdNumber(idNumber);
    }

}
