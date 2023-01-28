package com.example.demo.Service;


import com.example.demo.Config.BeanConfig;
import com.example.demo.DTO.ProfileImage;
import com.example.demo.DTO.State;
import com.example.demo.DTO.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

    @Autowired
    private BeanConfig beanConfig;

    @Autowired
    private FileService fileService;


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



    /**
     * 유저 이미지 변경 함수.
     * 기존의 이미지 파일과 DB에서 데이터를 삭제하고 새로운 이미지 파일과 데이터를 삽입
     * @param user
     * @param imageFile
     * @param imageName
     * @return
     */
    public boolean changeUserImage(User user, MultipartFile imageFile, String imageName){
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
            return true;
        } catch (Exception e){
            e.printStackTrace();
            tr.rollback();
            return false;
        }
    }



    /**
     * 사용자의 프로필 이미지를 default.png로 변경하는 함수
     * @param userId 변경할 유저 고유 번호
     * @return
     */
    public boolean deleteUserImage(Long userId) {

        try{
            User user = em.find(User.class, userId);
            if (!user.getProfileImage().getProfileImage().equals(beanConfig.DEFAULT_USER_IMAGE)){                       // 프로필 이미지가 default.png가 아닌경우
                fileService.deleteImage(user.getProfileImage().getProfileImage(), beanConfig.USER_PROFILE_DIRECTORY_NAME);  // 기존 프로필 이미지 파일 삭제
                em.remove(em.find(ProfileImage.class, user.getProfileImage().getProfileImage()));                       // profileimage 테이블에서 삭제
            }
            tr.begin();
            user.setProfileImage(new ProfileImage("default.png", "default.png"));             // 변경
            tr.commit();
            return true;
        } catch (Exception e){
            tr.rollback();
            e.printStackTrace();
            return false;
        }
    }
}
