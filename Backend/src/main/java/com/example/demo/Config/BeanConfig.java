package com.example.demo.Config;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import javax.persistence.*;
import java.util.Properties;

@Getter
@NoArgsConstructor
@Configuration
public class BeanConfig {

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
}
