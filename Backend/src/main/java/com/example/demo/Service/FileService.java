package com.example.demo.Service;

import com.example.demo.Config.BeanConfig;
import com.example.demo.Config.JpaConfig;
import com.example.demo.Controller.FileController.DTO.ImageAuth;
import com.example.demo.Entity.Funding.Funding;
import com.example.demo.Entity.ProfileImage.ProfileImage;
import com.example.demo.Entity.User.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
        EntityManager em = JpaConfig.emf.createEntityManager();
        EntityTransaction tr = em.getTransaction();

        try{
            user = em.find(User.class, user.getUserId());
            tr.begin();
            em.persist(profileImage);                                                                                   // profileImage 관리 시작 (없으면 DB에 삽입)
            em.persist(user);                                                                                           // JPA에서 관리 시작
            user.setProfileImage(profileImage);                                                                         // 변경
            tr.commit();
            em.close();
            return user.getProfileImage().getProfileImage();
        } catch (Exception e){
            tr.rollback();
            em.close();
            e.printStackTrace();
            return null;
        }
    }



    /**
     * 이미지 파일을 특정 디렉토리에 생성하는 함수
     * @param imageFile 생성할 이미지 파일
     * @param imageName 생성할 이미지 파일의 이름
     * @param targetDirectory 생성할 이미지 파일이 저장될 디렉토리
     *                        유저 프로필 관련 : profileImages
     *                        썸네일 관련 : thumbnailImages
     *                        프로젝트 컨텐츠 관련 : contentImages
     *                        프로젝트 물품 관련 : articleImages
     * @return
     */
    public boolean createImage(MultipartFile imageFile, String imageName, String targetDirectory){
        File newFile = null;
        switch (targetDirectory){
            case "profileImages":
                newFile = new File( beanConfig.PROFILE_IMAGE_PATH + imageName);
                break;
            case "thumbnailImages":
                newFile = new File( beanConfig.THUMBNAIL_IMAGE_PATH + imageName);
                break;
            case "contentImages":
                newFile = new File( beanConfig.CONTENT_IMAGE_PATH + imageName);
                break;
            case "articleImages":
                newFile = new File( beanConfig.ARTICLE_IMAGE_PATH + imageName);
                break;
            default:
                return false;
        }
        try {
            imageFile.transferTo(newFile);
            return true;
        } catch (Exception e){
            System.out.println("썸네일 이미지 생성실패");
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 이미지 파일을 특정 디렉토리에서 삭제하는 함수
     * @param imageName 생성할 이미지 파일의 이름
     * @param targetDirectory 생성할 이미지 파일이 저장될 디렉토리
     *                        유저 프로필 관련 : profileImages
     *                        썸네일 관련 : thumbnailImages
     *                        프로젝트 컨텐츠 관련 : contentImages
     *                        프로젝트 물품 관련 : articleImages
     * @return
     */
    public boolean deleteImage(String imageName, String targetDirectory){
        File newFile = null;
        switch (targetDirectory){
            case "profileImages":
                newFile = new File( beanConfig.PROFILE_IMAGE_PATH + imageName);
                break;
            case "thumbnailImages":
                newFile = new File( beanConfig.THUMBNAIL_IMAGE_PATH + imageName);
                break;
            case "contentImages":
                newFile = new File( beanConfig.CONTENT_IMAGE_PATH + imageName);
                break;
            case "articleImages":
                newFile = new File( beanConfig.ARTICLE_IMAGE_PATH + imageName);
                break;
            default:
                return false;
        }
        try {
            newFile.delete();
            return true;
        } catch (Exception e){
            e.printStackTrace();
            System.out.println("썸네일 이미지 제거 실패");
            return false;
        }
    }


    /**
     * 펀딩의 상태와 펀딩 작성자를 확인해서 보여줘도 되는 이미지인지 판단하는 함수
     *
     * @param userId 이미지를 요청한 유저의 id
     * @param fileName 요청한 이미지 파일
     * @param type 이미지의 타입(user, thumbnail, content, article)
     * @return true = 보여줘도 되는 이미지, false = 보여주면 안되는 이미지
     */
    public boolean isVisibleImage(Long userId, String fileName, String type) {
        EntityManager em = JpaConfig.emf.createEntityManager();

        Funding funding;
        switch (type){
            case "article":
                funding = (Funding) em.createQuery(
                                "SELECT new Funding(f.userId.userId, f.fundingStateCode.state) FROM Funding f " +
                                        "INNER JOIN Article a on f.id = a.fundingId.id " +
                                        "where a.articleImage =: fileName")
                        .setParameter("fileName", fileName)
                        .getSingleResult();
                break;
            case "thumbnail":
                funding = (Funding) em.createQuery(
                                "SELECT new Funding(f.userId.userId, f.fundingStateCode.state) FROM Funding f " +
                                        "INNER JOIN Thumbnail t on f.thumbnail.image = t.image " +
                                        "where t.image =: fileName")
                        .setParameter("fileName", fileName)
                        .getSingleResult();
                break;
            default:
                System.out.println("isVisibleThumbnailImage switch 문에서 default로 처리");
                return false;
        }

        ImageAuth imageAuth = new ImageAuth(funding.getUserId().getUserId(), funding.getFundingStateCode().getState());

        // 펀딩을 작성한 유저와 이미지를 호출한 유저가 같음 && 펀딩이 진행중이거나 종료된 상태임(종합적으로 판단했을 때 보여줘도 되는 상태)
        if (imageAuth.isVisibleFuningState()){
            return true;
        }
        // 펀딩이 진행중, 종료 상태가 아니라서 보여주면 안되지만 펀딩을 작성한 사람이므로 보여줘도 됨
        else if (imageAuth.isVisibleUser(userId) && !imageAuth.isVisibleFuningState()){
            return true;
        }
        // 나머지 경우 보여주면 안 됨
        else {
            return false;
        }
    }


}
