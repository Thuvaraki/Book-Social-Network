package com.thuva.book.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.http.SessionCreationPolicy;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity // Enables Spring Security’s web security support and integrates it into the Spring Boot app.
@RequiredArgsConstructor // Automatically generates a constructor for all final fields.
@EnableMethodSecurity(securedEnabled = true) // Allows to use annotations like: @Secured("ROLE_ADMIN") or @PreAuthorize("hasRole('USER')") on controller or service methods to control access.
public class SecurityConfig {
    private final JwtFilter jwtAuthFilter; // custom filter that checks for a JWT token in each request, validates it, and sets the user in the security context.
    private final AuthenticationProvider authenticationProvider; // AuthenticationProvider – a Spring Security component that defines how user authentication is done
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(withDefaults())
                .csrf(AbstractHttpConfigurer::disable) //disabled because JWT-based APIs don’t use cookies or sessions, so CSRF is unnecessary.
                .authorizeHttpRequests(req ->
                        req.requestMatchers( // accessible without a JWT token
                                "/auth/**",
                                        "/v2/api-docs",
                                        "/v3/api-docs",
                                        "/v3/api-docs/**",
                                        "/swagger-resources",
                                        "/swagger-resources/**",
                                        "/configuration/ui",
                                        "/configuration/security",
                                        "/swagger-ui/**",
                                        "/webjars/**",
                                        "/swagger-ui.html"
                        ).permitAll()
                                .anyRequest() // every other request must come with a valid JWT token.
                                .authenticated()
                        )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Tells Spring Security not to use HTTP sessions. Each request is independent (stateless) and must include the JWT token
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class); //Adds JwtFilter before Spring’s default UsernamePasswordAuthenticationFilter. Because our app doesn’t use username/password login for every request — instead, it uses a JWT token in the header.
        return http.build(); // builds and returns the configured security filter chain for Spring to use.
    }
}
