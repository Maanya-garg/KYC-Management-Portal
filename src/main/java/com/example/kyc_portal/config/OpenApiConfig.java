package com.example.kyc_portal.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("KYC Management Portal API")
                        .version("1.0")
                        .description("REST APIs for managing customer KYC records.")
                        .contact(new Contact()
                                .name("Maanya Garg")
                                .email("maanya.grg@gmail.com")));
    }

}