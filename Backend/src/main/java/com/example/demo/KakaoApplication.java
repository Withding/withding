package com.example.demo;

import com.example.demo.Config.BeanConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

@SpringBootApplication
public class KakaoApplication {
	public static void main(String[] args) {
		SpringApplication.run(KakaoApplication.class, args);
	}
}
