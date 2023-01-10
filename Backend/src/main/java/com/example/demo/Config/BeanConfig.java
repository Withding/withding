package com.example.demo.Config;

import com.example.demo.Repository.UserRepo;
import com.example.demo.Service.IntercepterService;
import com.example.demo.Service.JwtService;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.persistence.*;
import java.io.File;
import java.util.Properties;

@Getter
@NoArgsConstructor
@Configuration
public class BeanConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new IntercepterService())
                .addPathPatterns("/user/mypage"); // 해당 경로에 접근하기 전에 인터셉터가 가로챈다.
        //      .excludePathPatterns("/user/image/**"); // 해당 경로는 인터셉터가 가로채지 않는다.
        WebMvcConfigurer.super.addInterceptors(registry);
    }

    public final String PROFILE_IMAGE_URL = "/user/image/";
    public final String PROFILE_IMAGE_PATH = System.getProperty("user.dir") + File.separator + "profileImages/";


    @Value("${server.url}")
    public String SERVER_URL;

    @Value("${server.port}")
    public String SERVER_PORT;

    @Value("${spring.mail.host}")
    private String mailHost;

    @Value("${spring.mail.port}")
    private String mailPort;

    @Value("${spring.mail.username}")
    private String mailUserName;

    @Value("${spring.mail.password}")
    private String mailPw;

    @Value("${spring.mail.protocol}")
    private String mailProtocol;

    @Value("${jwt.private.key}")
    private String jwtKey;



    @Bean
    public EntityManagerFactory emf(){
        return Persistence.createEntityManagerFactory("jpabook");
    }

    @Bean
    public EntityManager em(){
        return this.emf().createEntityManager();
    }

    @Bean
    public EntityTransaction tr(){
        return em().getTransaction();
    }

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
        javaMailSender.setHost(mailHost);
        javaMailSender.setPort(Integer.parseInt(mailPort));
        javaMailSender.setUsername(mailUserName);
        javaMailSender.setPassword(mailPw);
        javaMailSender.setProtocol(mailProtocol);

        Properties prop = new Properties();
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.debug", "true");
        prop.put("mail.smtp.starttls.enable", "true");
        prop.put("mail.smtp.EnableSSL.enable", "true");
        prop.put("mail.smtp.ssl.trust", "smtp.gmail.com");
        //prop.put("mail.smtp.ssl.protocols", "TLSv1.2");
        javaMailSender.setJavaMailProperties(prop);

        return javaMailSender;
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }


    /*@Bean
    public UserRepo userRepol(){
        return new UserRepo();
    }*/


}
