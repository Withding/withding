package com.example.demo.Config;


import lombok.Data;
import lombok.Getter;
import lombok.ToString;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;



public class JpaConfig {
    public static EntityManagerFactory emf;

    public static void initEmf(){
        emf = Persistence.createEntityManagerFactory("withding");
    }

    public static void closeEmf(){
        emf.close();
    }

}
