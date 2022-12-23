package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling																										// 스케쥴러 사용
@SpringBootApplication
public class KakaoApplication {
	public static void main(String[] args) {
		SpringApplication.run(KakaoApplication.class, args);
	}
}
