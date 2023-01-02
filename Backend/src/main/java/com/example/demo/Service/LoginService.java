package com.example.demo.Service;

import com.example.demo.Config.AES256;
import com.example.demo.Config.BeanConfig;
import com.example.demo.DTO.*;

import com.example.demo.Gson.Gson;
import com.example.demo.Repository.UserRepo;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import java.text.SimpleDateFormat;
import java.util.List;

@Service
@NoArgsConstructor
@Data
public class LoginService {

    @Autowired
    private BeanConfig beanConfig;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private EntityManager em;

    @Autowired
    private EntityTransaction tr;

    @Autowired
    private AES256 aes256;


    /**
     * 카카오 로그인에 사용되는 함수
     * @param accessToken 발급받은 엑세스 토큰
     * @return User 객체
     */
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
                user.setNickName(json.kakao_account.profile.nickname);
                user.setState(em.find(State.class, 0));
                em.persist(user);
                tr.commit();
            } else {
                //System.out.println("유저가 존재함");
                user.setNickName(users.get(0).getNickName());
                user.setProfileImage(users.get(0).getProfileImage());
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

    /**
     * 로그인 함수
     * @param user email이 담겨있는 User 객체
     * @return
     */
    public User login(User user){
        try {
            user.setEmail(aes256.encrypt(user.getEmail()));
            user = userRepo.getUserToEmail(user);                                                                       // User 테이블에서 email, pwd 가 매칭되는 User 객체 반환
        } catch (Exception e){
            e.printStackTrace();
        }
        return user;
    }
}
