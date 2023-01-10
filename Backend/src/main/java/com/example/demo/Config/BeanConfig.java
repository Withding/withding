package com.example.demo.Config;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.*;
import java.io.File;
import java.util.Properties;

@Getter
@NoArgsConstructor
@Configuration
public class BeanConfig {


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

    @Value("${spring.security.oauth2.resourceserver.jwt.public-key-location}")
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




}
