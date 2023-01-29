package com.example.demo.Service;

import com.example.demo.Config.BeanConfig;
import com.example.demo.DTO.Funding;
import com.example.demo.DTO.FundingCategory;
import com.example.demo.DTO.Response.GetProject_0Level;
import com.example.demo.DTO.Response.GetProject_1Level;
import com.example.demo.DTO.Response.GetProject_2Level;
import com.example.demo.DTO.Thumbnail;
import com.example.demo.DTO.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.List;

@Service
@NoArgsConstructor
@Data
public class ProjectService {

    @Autowired
    private BeanConfig beanConfig;

    @Autowired
    private FileService fileService;

    @Autowired
    private EntityManager em;

    @Autowired
    private EntityTransaction tr;


    /**
     * 해당 유저가 글을 작성하던 유저인지 확인
     * @param requestUser 작성을 요청한 유저
     * @param id 작성 요청한 프로젝트 Id
     * @return 작성자가 맞으면 true, 아니면 false
     */
    public boolean isUserToProject(User requestUser, Long id) {
        try{
            User findUser = em.find(Funding.class, id).getUserId();
            if (requestUser.getUserId() == findUser.getUserId()){
                return true;
            } else {
                return false;
            }
        } catch (Exception e){
            return false;
        }
    }

    /**
     * 펀딩 카테고리 호출
     * @return 모든 카테고리 정보
     */
    public List<FundingCategory> getCategoryList(){
        return (List<FundingCategory>) em.createQuery("SELECT fc FROM FundingCategory fc")
                .getResultList();
    }


    /**
     * 프로젝트 작성 0단계 호출시 깡통 Funding 테이블을 만들어서 해당 프로젝트의 Id를 반환
     * @param user 세팅할 User 객체
     * @return 깡통으로 생성한 프로젝트 Id
     */
    public Long createProject_0Level(User user) {
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String now = dateFormat.format(new Timestamp(System.currentTimeMillis()));
            Funding funding = new Funding();
            funding.setUserId(user);
            funding.setCreatedAt(now);
            funding.setStartEnd(now);
            funding.setDeadLine(now);
            //funding.setFundingCategory();
            tr.begin();
            em.persist(funding);
            em.clear();                                                                                                 // 영속성 초기화. 이거 없으면 깡통 펀딩 호출시 대부분이 null 담겨서 날라옴
            tr.commit();
            return funding.getId();
        } catch (Exception e){
            tr.rollback();
            e.printStackTrace();
            return null;
        }
    }



    /**
     * 프로젝트 1단계에서 임시저장하는 함수. 없으면 생성하고 있으면 업데이트 시킴
     * @param funding 임시저장할 객체
     * @return Long 타입의 Funding Id
     */
    public boolean createProject_1Level(Funding funding, MultipartFile thumbnailImage, String thumbnailImageName){
        // ----------------------------------------- 조회 (추후 갯수제한때 사용할 수 있음) ---------------------------------------
        /*List<Funding> fundingList =
                (List<Funding>) em.createQuery("SELECT f FROM Funding f WHERE f.userId.userId =: userId " +
                        "AND f.fundingStateCode.stateCode =: stateCode")
                .setParameter("userId", funding.getUserId().getUserId())
                .setParameter("stateCode", 4)
                .getResultList();*/
        // -------------------------------------------------------------------------------------------------------------

        try{
            tr.begin();                                                                                                 // 트랜잭션 시작

            // ------------------------------------------ 디비에 임시저장된 글이 있다 ------------------------------------------
            Funding f = em.find(Funding.class, funding.getId());                                                        // 영속 관리 시작
            Thumbnail t = em.find(Thumbnail.class, f.getThumbnail().getImage());                                        // 영속 관리 시작

            if (!fileService.deleteImage(t.getImage(), beanConfig.THUMBNAIL_DIRECTORY_NAME)                               // 해당 썸네일 이미지 파일 삭제 실패 && 새로운 썸네일 저장 실패
                    && !fileService.createImage(thumbnailImage, thumbnailImageName, beanConfig.THUMBNAIL_DIRECTORY_NAME)){
                throw new Exception(); // 예외처리 발생
            }

            em.remove(t);                                                                                               // 테이블에서 기존 썸네일 삭제
            em.persist(funding.getThumbnail());                                                                         // 테이블에서 새로받은 썸네일 저장

            f.setTitle(funding.getTitle());                                                                             // 영속 관리중인 기존 funding 수정 시작
            f.setThumbnail(funding.getThumbnail());
            f.setMaxAmount(funding.getMaxAmount());
            f.setFundingCategory(funding.getFundingCategory());
            f.setStartEnd(funding.getStartEnd());
            f.setDeadLine(funding.getDeadLine());
            f.setCreatedAt(funding.getCreatedAt());
            // ---------------------------------------------------------------------------------------------------------
            tr.commit();                                                                                                // 트랜잭션 적용
            return true;
        } catch (Exception e){
            tr.rollback();
            e.printStackTrace();
            return false;
        }
    }


    /**
     * 프로젝트 작성 1단계 호출
     * @param projectId 호출할 프로젝트 번호
     * @return
     */
    public GetProject_1Level getProject_1Level(Long projectId) {
        try {
            Funding funding = em.find(Funding.class, projectId);                                                        // 영속성 등록 (persist 말고도 find로 조회해도 영속성으로 관리됨)

            System.out.println("funding = " + funding);
            GetProject_1Level getProject_1Level = new GetProject_1Level();
            getProject_1Level.setUserId(funding.getUserId().getUserId());
            getProject_1Level.setTitle(funding.getTitle());
            getProject_1Level.setTargetAmount(funding.getMaxAmount());
            getProject_1Level.setStartDate(funding.getStartEnd());
            getProject_1Level.setEndDate(funding.getDeadLine());
            getProject_1Level.setCategory(funding.getFundingCategory().getCategory());

            if (funding.getThumbnail() != null) {
                getProject_1Level.setPreViewImage(beanConfig.SERVER_URL + ":" + beanConfig.SERVER_PORT + beanConfig.THUMBNAIL_IMAGE_URL + funding.getThumbnail().getImage());
            } else {
                getProject_1Level.setPreViewImage(null);
            }

            return getProject_1Level;
        } catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }


    /**
     * 프로젝트 2단계 컨텐트 부분을 DB에 저장하는 함수
     * @param projectId 저장할 프로젝트 Id
     * @param content 저장할 프로젝트 내용
     * @return 정상 저장시 true, 비정상 처리시 false
     */
    public boolean createProject_2Level(final Long projectId, final String content) {
        try {
            Funding funding = em.find(Funding.class, projectId);
            tr.begin();
            funding.setContent(content);
            tr.commit();
            return true;
        }catch (Exception e){
            e.printStackTrace();
            tr.rollback();
            return false;
        }
    }


    /**
     * 내용에 삽입되는 이미지를 contentImages 디렉터리에 저장하는 함수
     * @param imageFile 내용에 삽입된 이미지 파일
     * @param imageFileName contentImages 디렉터리에 저장될 파일 이름
     * @return 정상 처리시 true, 비정상 처리시 false;
     */
    public boolean createContentImage(MultipartFile imageFile, String imageFileName) {
        try {
            fileService.createImage(imageFile, imageFileName, beanConfig.CONTENT_DIRECTORY_NAME);
            return true;
        } catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }







}
