package com.example.demo.Service;

import com.example.demo.Config.BeanConfig;
import com.example.demo.DTO.ProfileImage;
import com.example.demo.DTO.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.Multipart;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import java.io.File;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

@Service
@NoArgsConstructor
@Data
public class FileService {

    @Autowired
    private BeanConfig beanConfig;

    @Autowired
    private EntityManager em;

    @Autowired
    private EntityTransaction tr;


    /**
     * 변경하기 위한 이미지의 이름에 현재시간을 추가하고 공백들을 제거 및 profileImages 폴더에 저장하기 위한 함수
     * @param image 변경하기 위한 이미지
     * @return profileImages 폴더에 생성된 파일의 이름
     */
    public String createUserImage(MultipartFile image){
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        //-------- 파일 이름 변환하는 부분 -----------------------------------------------------------------------------------
        final String file = dateFormat.format(new Timestamp(System.currentTimeMillis()))                                // 현재 시간을 2023-01-14_21:22:23 등과 같이 표현
                + "_"                                                                                                   // 구분자
                + image.getOriginalFilename().replaceAll(" ", "");                                     // 파일 이름에 공백이 들어있을 수 있으므로 공백 제거
        File newFile = new File( beanConfig.PROFILE_IMAGE_PATH + file);                                        // 유저 이미지 관리하는 폴더에 파일 생성
        // -------------------------------------------------------------------------------------------------------------

        //-------- 생성된 파일에 덮어쓰기하는 부분 ------------------------------------------------------------------------------
        try{
            image.transferTo(newFile);
        } catch (Exception e) {
            e.printStackTrace();
        }
        // -------------------------------------------------------------------------------------------------------------

        return file;                                                                                                    // 폴더에 생성된 파일의 이름
    }


    /**
     * 사용자가 원하는 이미지로 변경하는 함수
     * @param user  userNum, nickName, loginTime이 세팅된 user 객체
     * @param profileImage user 테이블의 프로필 이미지에 변경될 ProfileImage 객체
     * @return 정상 true, 실패 false
     */
    public String changeUserImage(User user, ProfileImage profileImage){

        try{
            user = em.find(User.class, user.getUserId());
            tr.begin();
            em.persist(profileImage);                                                                                   // profileImage 관리 시작 (없으면 DB에 삽입)
            em.persist(user);                                                                                           // JPA에서 관리 시작
            user.setProfileImage(profileImage);                                                                         // 변경
            tr.commit();
            return user.getProfileImage().getProfileImage();
        } catch (Exception e){
            tr.rollback();
            e.printStackTrace();
            return null;
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
            tr.begin();
            em.persist(user);                                                                                           // JPA에서 관리 시작
            user.setProfileImage(new ProfileImage("default.png", "default.png"));             // 변경
            tr.commit();
            return true;
        } catch (Exception e){
            tr.rollback();
            e.printStackTrace();
            return false;
        }
    }


    /**
     * 프로젝트 작성시 썸네일로 사용할 이미지를 thumbnailImage 폴더에 저장하는 함수
     * @param thumbnailImage MultipartFile 타입의 저장할 이미지 파일
     * @param thumbnailImageName 저장할 때 이름으로 사용할 String 객체
     * @return
     */
    public boolean createThumbnailImage(MultipartFile thumbnailImage, String thumbnailImageName){
        File newFile = new File( beanConfig.THUMBNAIL_IMAGE_PATH + thumbnailImageName);
        try{
            thumbnailImage.transferTo(newFile);
            return true;
        } catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
}
