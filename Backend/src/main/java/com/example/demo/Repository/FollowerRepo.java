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
public class FollowerRepo {

    @Autowired
    private EntityManager em;

    @Autowired
    private EntityTransaction tr;

    public Long getCountToUserId(Long user_id){
        return (Long) em.createQuery("SELECT COUNT(f.user.userId) FROM Follower f WHERE f.user.userId =: user_id")
                .setParameter("user_id", user_id)
                .getSingleResult();
    }

}
