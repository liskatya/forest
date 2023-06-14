package com.rproject.forest.config
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.web.SecurityFilterChain
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
@EnableWebSecurity
class WebSecurityConfig {
    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http.csrf{csrf -> csrf.disable()
            .authorizeHttpRequests()
            .requestMatchers("/**").permitAll()}

        http.authorizeHttpRequests{req -> req.requestMatchers("/**").permitAll()}

        return http.build()
    }

    @Bean
    fun corsMappingConfigurer(): WebMvcConfigurer? {
        return object : WebMvcConfigurer {
            override fun addCorsMappings(registry: CorsRegistry) {
                registry.addMapping("/**")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("*")
                    .maxAge(3600)
                    .allowedHeaders("*")
                    .allowCredentials(true)
            }
        }
    }
}
