package com.example.demo.Repository;


import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;

@Repository
@NoArgsConstructor
@Data
public class VoteRepo {
    @Autowired
    private EntityManager em;

    @Autowired
    private EntityTransaction tr;

    /**
     *
     * @param user_id
     * @return
     */
    public Long getCountToUserId(Long user_id){
        return (Long) em.createQuery("SELECT COUNT(v.user_id) FROM Vote v WHERE v.user_id =: user_id")
                .setParameter("user_id", user_id)
                .getSingleResult();
    }
}
