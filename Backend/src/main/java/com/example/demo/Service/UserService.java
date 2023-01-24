package com.example.demo.Service;


import com.example.demo.DTO.State;
import com.example.demo.DTO.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.servlet.http.HttpServletRequest;

@Service
@NoArgsConstructor
@Data
public class UserService {

    @Autowired
    private EntityManager em;

    @Autowired
    private EntityTransaction tr;


    /**
     * jwtService에서 HttpServletRequest에 설정한 속성들을 User 객체에 세팅해서 반환
     * @param request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @return userNum, nickName, loginTime을 세팅한 User 객체
     */
    public User setUserToHttpServletRequestAttribute(HttpServletRequest request){
        try{
            User user = (User) em.createQuery("SELECT u FROM User u WHERE u.userId =: id AND u.state.stateCode =: code")
                            .setParameter("id", request.getAttribute("userNum"))
                            .setParameter("code", 0)
                            .getResultList()
                            .get(0);
            if (user != null){
                return user;
            }
            return null;
        } catch (Exception e){
            System.out.println("UserService.setUserToHttpServletRequestAttribute()에서 인증 실패 !!!");
            return null;
        }
    }
}
