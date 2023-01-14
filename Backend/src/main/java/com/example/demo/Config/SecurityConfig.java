package com.example.demo.Config;

import com.example.demo.Service.IntercepterService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig implements WebMvcConfigurer {

    @Bean
    protected SecurityFilterChain configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .cors().disable()
                .headers().frameOptions().disable();
        return http.build();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new IntercepterService())
                .addPathPatterns("/user/mypage/**", "/user/image/change"); // 해당 경로에 접근하기 전에 인터셉터가 가로챈다.
        //      .excludePathPatterns("/user/image/**"); // 해당 경로는 인터셉터가 가로채지 않는다.
        WebMvcConfigurer.super.addInterceptors(registry);
    }

}
