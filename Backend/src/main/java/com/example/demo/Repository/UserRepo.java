package com.example.demo.Repository;

import com.example.demo.DTO.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import java.util.List;

@Repository
@NoArgsConstructor
@Data
public class UserRepo {

    @Autowired
    private EntityManager em;

    @Autowired
    private EntityTransaction tr;


    public List<User> findToEmail(final User user){
        List<User> users = (List<User>) em.createQuery("SELECT u.userId FROM User u WHERE u.email =: email")
                .setParameter("email", user.getEmail())
                .getResultList();
        return users;
    }

}
