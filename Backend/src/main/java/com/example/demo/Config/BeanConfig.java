package com.example.demo.Config;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Configuration
public class BeanConfig {

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

}
