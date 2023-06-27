package com.example.demo.Config;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
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
    public final String DEFAULT_USER_IMAGE = "default.png";                                                             // 유저 프로필 기본 이미지 이름
    private final Long maxFundingCategoryCount = 17L;
    private final int maxProjectArticleCount = 5;                                                                       // 프로젝트에 등록 가능한 물품 갯수

    public final String USER_PROFILE_DIRECTORY_NAME = "profileImages";                                                  // 유저 프로필 이미지 파일 저장 디렉터리명
    public final String THUMBNAIL_DIRECTORY_NAME = "thumbnailImages";                                                   // 썸네일 이미지 파일 저장 디렉터리명
    public final String CONTENT_DIRECTORY_NAME = "contentImages";                                                       // 컨텐트에 담기는 이미지 파일 디렉터리명
    public final String ARTICLE_DIRECTORY_NAME = "articleImages";                                                       // 물품 이미지 파일 저장 디렉터리명

    public final String PROFILE_IMAGE_URL = "/user/images/";                                                             // 유저 프로필 호출 URL
    public final String PROFILE_IMAGE_PATH = System.getProperty("user.dir") + File.separator + "profileImages/";        // 유저 이미지 파일 저장 경로

    public final String THUMBNAIL_IMAGE_URL = "/thumbnail/images/";                                                     // 썸네일 호출 URL
    public final String THUMBNAIL_IMAGE_PATH = System.getProperty("user.dir") + File.separator + "thumbnailImages/";    // 썸네일 이미지 파일 저장 경로

    public final String CONTENT_IMAGE_URL = "/content/images/";                                                         // 컨텐츠 이미지 호출 URL
    public final String CONTENT_IMAGE_PATH = System.getProperty("user.dir") + File.separator + "contentImages/";        // 컨텐츠 이미지 파일 저장 경로

    public final String ARTICLE_IMAGE_URL = "/article/images/";                                                         // 물품 이미지 호출 URL
    public final String ARTICLE_IMAGE_PATH = System.getProperty("user.dir") + File.separator + "articleImages/";        // 물품 이미지 파일 저장 경로

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
