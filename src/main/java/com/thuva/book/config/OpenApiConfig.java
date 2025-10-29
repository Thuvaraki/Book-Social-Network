package com.thuva.book.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;

// @OpenAPIDefinition - defines the overall OpenAPI specification for the application.
@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "Thuva",
                        email = "thuvaraki12@gmail.com",
                        url = "https://portfolio-ten-lake-64.vercel.app/"
                ),
                description = "OpenApi documentation for Spring Security",
                title = "OpenApi specification - thuva",
                version = "1.0",
                license = @License(
                        name = "Licence name",
                        url = "https://some-url.com"
                ),
                termsOfService = "Terms of service"
        ),
        servers = {
                @Server(
                        description = "Local ENV",
                        url = "http://localhost:8088/api/v1"
                ),
                @Server(
                        description = "PROD ENV",
                        url = "https://thuva.com" // fake one
                )
        },
        security = { // This tells Swagger that all API endpoints require a security scheme named "bearerAuth"
                @SecurityRequirement(
                        name = "bearerAuth"
                )
        }
)
@SecurityScheme(
        name = "bearerAuth",
        description = "JWT auth description",
        scheme = "bearer", // Type of token
        type = SecuritySchemeType.HTTP, // Type of security scheme
        bearerFormat = "JWT", // Describes the token format
        in = SecuritySchemeIn.HEADER // Where the token is expected — here, in the HEADER
)

public class OpenApiConfig {
}