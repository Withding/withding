package com.example.demo.Service;


import com.example.demo.Config.BeanConfig;
import com.example.demo.Config.JpaConfig;
import com.example.demo.Controller.UserController.DTO.UserInfo;
import com.example.demo.DTO.Follow;
import com.example.demo.DTO.FundingStateCode;
import com.example.demo.DTO.ProfileImage;
import com.example.demo.DTO.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Synchronized;
import org.hibernate.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
@NoArgsConstructor
@Data
public class UserService {

    //@Autowired
    //private EntityManager em;

    //@Autowired
    //private EntityTransaction tr;

    @Autowired
    private BeanConfig beanConfig;

    @Autowired
    private FileService fileService;


    public User getUserToUserId(Long userId){
        EntityManager em = JpaConfig.emf.createEntityManager();
        return em.find(User.class, userId);
    }




    /**
     * jwtService에서 HttpServletRequest에 설정한 속성들을 User 객체에 세팅해서 반환
     * @param request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @return userNum, nickName, loginTime을 세팅한 User 객체
     */
    @Synchronized
    public User setUserToHttpServletRequestAttribute(HttpServletRequest request){
        EntityManager em = JpaConfig.emf.createEntityManager();
        try{
            System.out.println("setUserToHttpServletRequestAttribute = " + request.getAttribute("userNum"));

            User user = em.find(User.class, request.getAttribute("userNum"));

            user.setLoginTime((String) request.getAttribute("loginTime"));
            System.out.println("인증 함수 user = " + user);

            // ------------------------------ String 타입의 시간 -> Date 타입의 시간으로 변경 -----------------------------------
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date loginDate = dateFormat.parse(user.getLoginTime());
            Date logoutDate = dateFormat.parse(user.getLogoutAt());
            // ---------------------------------------------------------------------------------------------------------
            if (       user != null                                                                                     // 해당 userId에 대한 유저가 존재
                    && user.getState().getStateCode() == 0                                                              // 해당 유저의 stateCode가 0(활동중)인 상태임
                    && loginDate.after(logoutDate) == true) {                                                           // 로그아웃(logoutDate) 시간은 로그인(loginDate) 시간보다 이전(before)이다 == true == 탈취당한게 아님
                em.close();
                return user;
            } else {
                em.close();
                return null;
            }
        } catch (Exception e){
            System.out.println("UserService.setUserToHttpServletRequestAttribute()에서 인증 실패 !!!");
            e.printStackTrace();
            em.close();
            return null;
        }
    }



    /**
     * 유저 이미지 변경 함수.
     * 기존의 이미지 파일과 DB에서 데이터를 삭제하고 새로운 이미지 파일과 데이터를 삽입
     * @param user
     * @param imageFile
     * @param imageName
     * @return
     */
    public boolean changeUserImage(User user, MultipartFile imageFile, String imageName){
        EntityManager em = JpaConfig.emf.createEntityManager();
        EntityTransaction tr = em.getTransaction();

        User findUser = em.find(User.class, user.getUserId());

        if (!findUser.getProfileImage().getProfileImage().equals(beanConfig.DEFAULT_USER_IMAGE)){                       // 프로필 이미지가 default.png가 아닌경우
            fileService.deleteImage(findUser.getProfileImage().getProfileImage(), beanConfig.USER_PROFILE_DIRECTORY_NAME);  // 기존 프로필 이미지 파일 삭제
        }
        fileService.createImage(imageFile, imageName, beanConfig.USER_PROFILE_DIRECTORY_NAME);

        try {
            tr.begin();
            ProfileImage oldProfileImage = em.find(ProfileImage.class, findUser.getProfileImage().getProfileImage());

            if (!oldProfileImage.getProfileImage().equals(beanConfig.DEFAULT_USER_IMAGE)){                              // 프로필 이미지가 default.png가 아닌경우
                em.remove(oldProfileImage);                                                                             // 테이블에서 기존 프로필 이미지 데이터 삭제
            }

            ProfileImage newProfileImage = new ProfileImage(imageName, imageFile.getOriginalFilename());                // 새로운 프로필 이미지 생성
            em.persist(newProfileImage);                                                                                // 테이블에 새로운 프로필 이미지 데이터 저장

            findUser.setProfileImage(newProfileImage);                                                                  // user 테이블에 반영
            tr.commit();
            em.close();
            return true;
        } catch (Exception e){
            e.printStackTrace();
            tr.rollback();
            em.close();
            return false;
        }
    }



    /**
     * 사용자의 프로필 이미지를 default.png로 변경하는 함수
     * @param userId 변경할 유저 고유 번호
     * @return
     */
    public boolean deleteUserImage(Long userId) {
        EntityManager em = JpaConfig.emf.createEntityManager();
        EntityTransaction tr = em.getTransaction();
        try{
            tr.begin();
            User user = em.find(User.class, userId);
            if (!user.getProfileImage().getProfileImage().equals(beanConfig.DEFAULT_USER_IMAGE)){                       // 프로필 이미지가 default.png가 아닌경우
                fileService.deleteImage(user.getProfileImage().getProfileImage(), beanConfig.USER_PROFILE_DIRECTORY_NAME);  // 기존 프로필 이미지 파일 삭제
                em.remove(em.find(ProfileImage.class, user.getProfileImage().getProfileImage()));                       // profileimage 테이블에서 삭제
            }
            user.setProfileImage(new ProfileImage("default.png", "default.png"));             // 변경
            tr.commit();
            em.close();
            return true;
        } catch (Exception e){
            tr.rollback();
            e.printStackTrace();
            em.close();
            return false;
        }
    }

    /**
     * 특정 사용자의 정보를 호출하는 함수
     * @param user 로그인한 유저
     * @param target 정보를 가져올 사용자
     * @return
     */
    public UserInfo getUserInfo(User user, User target) {
        EntityManager em = JpaConfig.emf.createEntityManager();
        UserInfo userInfo = new UserInfo();

        userInfo.setNickname(target.getNickName());
        userInfo.setUserImage(beanConfig.SERVER_URL + ":"+ beanConfig.SERVER_PORT + beanConfig.PROFILE_IMAGE_URL + target.getProfileImage().getProfileImage());
        userInfo.setFundingCount((Long) em.createQuery("SELECT COUNT(f) FROM Funding f where f.userId =: userId")
                .setParameter("userId", target)
                .getSingleResult());
        userInfo.setFollowerCount((Long) em.createQuery("SELECT COUNT(f) FROM Follow f where f.follower =: userId")
                .setParameter("userId", target.getUserId())
                .getSingleResult());
        userInfo.setFollowingCount((Long) em.createQuery("SELECT COUNT(f) FROM Follow f where f.user =: target")
                .setParameter("target", target)
                .getSingleResult());

        // 팔로잉 중인지 확인(1이상이면 팔로잉중. 참고로 2이상일 수가 없음)
        Long followCount = (Long) em.createQuery("select COUNT(f) from Follow f where f.follower =: userId AND f.user =: target")
                .setParameter("userId", user.getUserId())
                .setParameter("target", target)
                .getSingleResult();
        if (followCount > 0){
            userInfo.setIsFollowing(true);
        }else {
            userInfo.setIsFollowing(false);
        }

        return userInfo;
    }


}
