package com.hospital.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Configuración de seguridad de Spring Security.
 * Actualmente deshabilitada para permitir acceso sin autenticación durante desarrollo.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * Configura la cadena de filtros de seguridad.
     * Permite todas las peticiones sin autenticación y deshabilita CSRF.
     *
     * @param http Objeto HttpSecurity para configurar
     * @return SecurityFilterChain configurado
     * @throws Exception si hay error en la configuración
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()
            );

        return http.build();
    }
}
