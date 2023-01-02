package com.example.demo.Repository;

import com.example.demo.DTO.State;
import com.example.demo.DTO.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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


    /**
     * User 객체를 User 테이블에 저장
     * @param request 저장할 User 객체
     * @return 정상 저장시 true 반환
     */
    public boolean save(final User request) {
        boolean result = false;
        try{
            tr.begin();
            em.persist(request);
            tr.commit();
            result = true;
        }catch (Exception e){
            e.printStackTrace();
            tr.rollback();
        }
        return result;
    }


    /**
     * 특정 email로 User 테이블을 검색
     * @param user 검색할 email이 담긴 User 객체
     * @return List<User> 객체 반환
     */
    public List<User> findUserToEmail(final User user){
        List<User> users = (List<User>) em.createQuery("SELECT u.userId FROM User u WHERE u.email =: email")
                .setParameter("email", user.getEmail())
                .getResultList();
        return users;
    }


    /**
     * 양방향 암호화된 email로 해당되는 User 객체를 반환
     * @param user email이 담겨있는 User 객체
     * @return 찾은 User 객체
     */
    public User getUserToEmail(User user) {
        return (User) em.createQuery("SELECT u FROM User u WHERE u.email =: email AND u.state.stateCode = 0")
                .setParameter("email", user.getEmail())
                .getSingleResult();
    }

    public User getUserToUserId(User user){
        return em.find(User.class, user.getUserId());
    }
}
