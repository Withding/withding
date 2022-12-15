package com.example.demo.Service;

import com.example.demo.Config.BeanConfig;
import com.example.demo.DTO.IdType;
import com.example.demo.DTO.State;
import com.example.demo.DTO.User;
import com.example.demo.Gson.Gson;
import lombok.Data;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import java.text.SimpleDateFormat;
import java.util.List;

@Service
@Data
public class LoginService {

    @Autowired
    private BeanConfig beanConfig;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private EntityManager em;

    @Autowired
    private EntityTransaction tr;

    public User kakaoLogin(final String accessToken){
        User user = new User();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<String> entity = new HttpEntity<String>(headers);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response;
        Gson json;
        try {
            response = rt.exchange(
                    "https://kapi.kakao.com/v2/user/me", // {요청할 서버 주소}
                    HttpMethod.POST,                         // {요청할 방식}
                    entity,                                  // {요청할 때 보낼 데이터}
                    String.class                             // {요청시 반환되는 데이터 타입}
            );
            com.google.gson.Gson gson = new com.google.gson.Gson();
            json = gson.fromJson(response.getBody(), Gson.class);
        }catch (Exception e){
            return user;
        }
        
        try {
            List<User> users = em.createQuery("select u from User u where u.email = :email", User.class)
                    .setParameter("email", String.valueOf(json.id))
                    .getResultList();
            if (users.size() < 1) {
                tr.begin();
                //System.out.println("user == null로 들어옴");
                user.setEmail(String.valueOf(json.id));
                user.setCreatedAt(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(json.connected_at));
                user.setIdType(em.find(IdType.class, 1));
                user.setName(json.kakao_account.profile.nickname);
                user.setState(em.find(State.class, 0));
                em.persist(user);
                tr.commit();
            } else {
                //System.out.println("유저가 존재함");
                user = users.get(0);
            }

        }
        catch (Exception e){
            e.printStackTrace();
            tr.rollback();
            //System.out.println("catch()로 들어옴");
        }finally {
            em.clear();
        }

        return user;
    }
}
