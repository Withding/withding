package com.example.demo.Service;

import com.example.demo.Config.AES256;
import com.example.demo.Config.BeanConfig;
import com.example.demo.Config.JpaConfig;
import com.example.demo.DTO.*;

import com.example.demo.DTO.Response.Login;
import com.example.demo.Gson.Gson;
import com.example.demo.Repository.UserRepo;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
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
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserRepo userRepo;

    //@Autowired
    //private EntityManager em;

    //@Autowired
    //private EntityTransaction tr;

    @Autowired
    private AES256 aes256;


    /**
     * 카카오 로그인에 사용되는 함수
     * @param accessToken 발급받은 엑세스 토큰
     * @return User 객체
     */
    public User kakaoLogin(final String accessToken){

        EntityManager em = JpaConfig.emf.createEntityManager();
        EntityTransaction tr = em.getTransaction();

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
            em.close();
            return null;
        }
        
        try {
            List<User> users = em.createQuery("select u from User u where u.email = :email", User.class)
                    .setParameter("email", String.valueOf(json.id))
                    .getResultList();
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String now = dateFormat.format(json.connected_at);

            // -------------------------- 로그인 시간 세팅 -----------------------------------------------------------------
            Timestamp loginTimestamp = new Timestamp(System.currentTimeMillis());
            String loginTime = dateFormat.format(loginTimestamp);
            // ---------------------------------------------------------------------------------------------------------

            // -------------------------- 로그아웃 시간 세팅 -----------------------------------------------------------------
            Timestamp logoutTimestamp = new Timestamp(System.currentTimeMillis() - 1000L);
            String logoutTime = dateFormat.format(logoutTimestamp);
            // ---------------------------------------------------------------------------------------------------------
            if (users.size() < 1) {
                User user = new User();
                tr.begin();
                //System.out.println("user == null로 들어옴");
                user.setEmail(String.valueOf(json.id));
                user.setCreatedAt(now);
                user.setLogoutAt(now);
                user.setProfileImage(em.find(ProfileImage.class, "default.png"));
                user.setIdType(em.find(IdType.class, 1));
                user.setNickName(json.kakao_account.profile.nickname);
                user.setState(em.find(State.class, 0));
                user.setLoginTime(loginTime);                                                                           // 로그인 시간 세팅
                user.setLogoutAt(logoutTime);                                                                           // 로그아웃 시간 세팅
                em.persist(user);
                tr.commit();
                em.close();
                return user;
            } else if (users.size() <= 1 && users.get(0).getState().getStateCode() == 0) {
                User user = new User();
                //System.out.println("유저가 존재함");
                user.setUserId(users.get(0).getUserId());
                user.setNickName(users.get(0).getNickName());
                user.setProfileImage(users.get(0).getProfileImage());
                user.setLoginTime(loginTime);
                user.setLogoutAt(logoutTime);                                                                           // 로그아웃 시간 세팅
                em.close();
                return user;
            } else {
                em.close();
                return null;
            }
        }
        catch (Exception e){
            e.printStackTrace();
            tr.rollback();
            em.close();
            return null;
        }


    }


    /**
     * 로그인 함수
     * @param user email이 담겨있는 User 객체
     * @return
     */
    public Login login(User user){
        try {
            String requestPwd = user.getPassword();
            user.setEmail(aes256.encrypt(user.getEmail()));
            user = userRepo.getUserToEmail(user);                                                                       // User 테이블에서 email, pwd 가 매칭되는 User 객체 반환
            System.out.println(user);

            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            user.setLoginTime(dateFormat.format(new Timestamp(System.currentTimeMillis())));

            if (       user != null                                                                                     // 이메일에 해당하는 유저가 존재
                    && bCryptPasswordEncoder.matches(requestPwd, user.getPassword()) == true                            // && 비밀번호 확인
            ) {
                return new Login(
                        jwtService.generateJwtToken(user.getUserId(), user.getNickName(), user.getLoginTime())
                        , user.getNickName()
                        ,beanConfig.SERVER_URL + ":" + beanConfig.SERVER_PORT + beanConfig.PROFILE_IMAGE_URL + user.getProfileImage().getProfileImage()
                );
            }else {
                return null;
            }
        } catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }


    /**
     * 로그아웃
     * @param user userService.setUserToHttpServletRequestAttribute()에서 세팅되어 나온 User 객체
     * @return
     */
    public boolean logout(User user) {
        EntityManager em = JpaConfig.emf.createEntityManager();
        EntityTransaction tr = em.getTransaction();
        try{
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String logoutString = dateFormat.format(new Timestamp(System.currentTimeMillis()));
            tr.begin();
            em.detach(user);
            user.setLogoutAt(logoutString);
            tr.commit();
            em.close();
            return true;
        }catch (Exception e){
            e.printStackTrace();
            tr.rollback();
            em.close();
            return false;
        }
    }
}
