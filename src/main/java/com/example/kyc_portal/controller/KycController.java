package com.example.kyc_portal.controller;

import com.example.kyc_portal.DTO.SearchRequestDTO;
import com.example.kyc_portal.model.KycRecord;
import com.example.kyc_portal.service.KycService;
import org.apache.catalina.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class KycController {
    @Autowired
    KycService service;
    @GetMapping("/kyc")
    public List<KycRecord> getAllKyc() {
        return service.getAllKyc();
    }

    @PostMapping("/create")
    public KycRecord createKyc(@RequestBody KycRecord record) {
        return service.createKyc(record);
    }
    @PostMapping("/search")
    public KycRecord searchKyc(@RequestBody SearchRequestDTO request)
    {
        return service.searchKyc(request);
    }
    @PutMapping("/update/{idNumber}")
    public KycRecord updateKyc(
            @PathVariable String idNumber,
            @RequestBody KycRecord updatedRecord){

        return service.updateKyc(idNumber, updatedRecord);
    }

}
