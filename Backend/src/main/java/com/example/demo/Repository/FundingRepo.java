package com.example.demo.Repository;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;

@Repository
@Data
@NoArgsConstructor
public class FundingRepo {

    @Autowired
    private EntityManager em;

    @Autowired
    private EntityTransaction tr;

    /*public Long getCountToUserId(Long userId){
        return (Long) em.createQuery("SELECT count(f.funding_id) FROM Funding f WHERE f.")


    }*/
}
