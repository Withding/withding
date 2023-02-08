package com.example.demo.Service;

import com.example.demo.Config.BeanConfig;
import com.example.demo.Config.JpaConfig;
import com.example.demo.DTO.*;
import com.example.demo.DTO.Response.GetProject_0Level;
import com.example.demo.DTO.Response.GetProject_1Level;
import com.example.demo.DTO.Response.GetProject_2Level;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Synchronized;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@NoArgsConstructor
@Data
public class ProjectService {

    @Autowired
    private BeanConfig beanConfig;

    @Autowired
    private FileService fileService;

    //@Autowired
    //private EntityManager em;

    //@Autowired
    //private EntityTransaction tr;


    /**
     * 해당 유저가 글을 작성하던 유저인지 확인
     * @param requestUser 작성을 요청한 유저
     * @param id 작성 요청한 프로젝트 Id
     * @return 작성자가 맞으면 true, 아니면 false
     */
    public boolean isUserToProject(User requestUser, Long id) {
        EntityManager em = JpaConfig.emf.createEntityManager();

        try{
            User findUser = em.find(Funding.class, id).getUserId();
            if (requestUser.getUserId() == findUser.getUserId()){
                em.close();
                return true;
            } else {
                em.close();
                return false;
            }
        } catch (Exception e){
            em.close();
            return false;
        }
    }


    /**
     * 펀딩 카테고리 호출
     * @return 모든 카테고리 정보
     */
    public List<FundingCategory> getCategoryList(){
        EntityManager em = JpaConfig.emf.createEntityManager();
        EntityTransaction tr = em.getTransaction();
        List<FundingCategory> categories = new ArrayList<>();
        try {
            for (Long i = -1L; i <= beanConfig.getMaxFundingCategoryCount(); i++){
                FundingCategory fundingCategory = em.find(FundingCategory.class, i);
                categories.add(fundingCategory);
            }

            em.close();
            return categories;
        } catch (Exception e){
            e.printStackTrace();
            em.close();
            return null;
        }

    }


    /**
     * 프로젝트 작성 0단계 호출시 깡통 Funding 테이블을 만들어서 해당 프로젝트의 Id를 반환
     * @param user 세팅할 User 객체
     * @return 깡통으로 생성한 프로젝트 Id
     */
    public Long createProject_0Level(User user) {
        EntityManager em = JpaConfig.emf.createEntityManager();
        EntityTransaction tr = em.getTransaction();

        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String now = dateFormat.format(new Timestamp(System.currentTimeMillis()));
            Funding funding = new Funding();
            funding.setUserId(user);
            funding.setCreatedAt(now);
            tr.begin();
            em.persist(funding);
            tr.commit();
            em.close();                                                                                                 // 영속성 초기화. 이거 없으면 깡통 펀딩 호출시 대부분이 null 담겨서 날라옴
            return funding.getId();
        } catch (Exception e){
            tr.rollback();
            e.printStackTrace();
            em.close();
            return null;
        }
    }



    /**
     * 프로젝트 1단계에서 임시저장하는 함수. 없으면 생성하고 있으면 업데이트 시킴
     * @param funding 임시저장할 객체
     * @return Long 타입의 Funding Id
     */
    public boolean createProject_1Level(Funding funding, MultipartFile thumbnailImage, String thumbnailImageName){

        EntityManager em = JpaConfig.emf.createEntityManager();
        EntityTransaction tr = em.getTransaction();

        try{
            tr.begin();// 트랜잭션 시작
            Funding f = em.find(Funding.class, funding.getId());


            // 기존 썸네일 유지
            if (thumbnailImageName == null){

            }
            // 썸네일 변경
            else{
                if (fileService.createImage(thumbnailImage, thumbnailImageName, beanConfig.THUMBNAIL_DIRECTORY_NAME)){  // 등록
                    Thumbnail newThumbnail = new Thumbnail(thumbnailImageName, thumbnailImage.getOriginalFilename());
                    em.persist(newThumbnail);
                    f.setThumbnail(newThumbnail);
                }else {
                    throw new Exception();
                }
            }


            f.setTitle(funding.getTitle());                                                                             // 영속 관리중인 기존 funding 수정 시작
            f.setMaxAmount(funding.getMaxAmount());
            f.setFundingCategory(funding.getFundingCategory());
            System.out.println("getStartEnd = " + funding.getStartEnd());
            System.out.println("getDeadLine = " + funding.getDeadLine());
            f.setStartEnd(funding.getStartEnd());
            f.setDeadLine(funding.getDeadLine());
            f.setCreatedAt(funding.getCreatedAt());
            // ---------------------------------------------------------------------------------------------------------

            tr.commit();                                                                                                // 트랜잭션 적용
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
     * 프로젝트 작성 1단계 호출
     * @param projectId 호출할 프로젝트 번호
     * @return
     */
    public GetProject_1Level getProject_1Level(Long projectId) {
        EntityManager em = JpaConfig.emf.createEntityManager();
        EntityTransaction tr = em.getTransaction();
        try {
            Funding funding = em.find(Funding.class, projectId);                                                        // 영속성 등록 (persist 말고도 find로 조회해도 영속성으로 관리됨)

            System.out.println("funding = " + funding);
            GetProject_1Level getProject_1Level = new GetProject_1Level();
            getProject_1Level.setUserId(funding.getUserId().getUserId());
            getProject_1Level.setTitle(funding.getTitle());
            getProject_1Level.setTargetAmount(funding.getMaxAmount());
            getProject_1Level.setStartDate(funding.getStartEnd());

            if (funding.getDeadLine() == null){
                getProject_1Level.setEndDate("");
            }else {
                getProject_1Level.setEndDate(funding.getDeadLine());
            }
            if (funding.getStartEnd() == null){
                getProject_1Level.setStartDate("");
            }else {
                getProject_1Level.setStartDate(funding.getStartEnd());
            }

            getProject_1Level.setCategory(funding.getFundingCategory().getId());

            if (funding.getThumbnail() != null) {
                getProject_1Level.setPreViewImage(beanConfig.SERVER_URL + ":" + beanConfig.SERVER_PORT + beanConfig.THUMBNAIL_IMAGE_URL + funding.getThumbnail().getImage());
            } else {
                getProject_1Level.setPreViewImage(null);
            }
            em.close();
            return getProject_1Level;
        } catch (Exception e){
            e.printStackTrace();
            em.close();
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
        EntityManager em = JpaConfig.emf.createEntityManager();
        EntityTransaction tr = em.getTransaction();
        try {
            Funding funding = em.find(Funding.class, projectId);
            tr.begin();
            funding.setContent(content);
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


    /**
     * 프로젝트 2단계 호출
     * @param projectId 저장할 프로젝트 Id
     * @return 정상처리시 String 타입의 프로젝트 content, 비정상 처리시 null
     */
    public String getProject_2Level(Long projectId) {
        EntityManager em = JpaConfig.emf.createEntityManager();
        try{
            Funding funding = em.find(Funding.class, projectId);
            em.close();
            return funding.getContent();
        }catch (Exception e){
            e.printStackTrace();
            em.close();
            return null;
        }
    }


    /**
     * 프로젝트 3단계 저장
     * @param projectId 저장할 프로젝트 Id
     * @param article 물건정보가 담긴 article 객체
     * @return
     */
    public boolean createProject_3Level(Long projectId, Article article) {
        EntityManager em = JpaConfig.emf.createEntityManager();
        EntityTransaction tr = em.getTransaction();

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        String nowString = null;
        Date nowDate = null;
        Date sendDate = null;
        try{
            // ------------------------------------------- 물품 갯수 5개인지 확인하는 부분 -------------------------------------
            Long projectCount = (Long) em.createQuery("SELECT count(a) FROM Article a WHERE a.fundingId.id =: projectId")
                                .setParameter("projectId", projectId)
                                .getSingleResult();
            //----------------------------------------------------------------------------------------------------------
            if (article.getShippingDay().equals("")){
                article.setShippingDay(null);
            }
            else if (!article.getShippingDay().equals("") && article.getShippingDay().length() <= 19) {
                nowString = dateFormat.format(timestamp);
                nowDate = dateFormat.parse(nowString);
                sendDate = dateFormat.parse(article.getShippingDay() + " 00:00:00");
                System.out.println("nowDate" + nowDate);
                System.out.println("sendDate" + sendDate);
                System.out.println("sendDate.after(nowDate) = " + sendDate.after(nowDate));
                if (!sendDate.after(nowDate)){
                    em.close();
                    return false;
                }
            }


            if (projectCount <= beanConfig.getMaxProjectArticleCount()){                                                // DB에 저장된 물품이 5개 미만일때
                tr.begin();
                Funding funding = em.find(Funding.class, projectId);
                System.out.println(article);
                article.setFundingId(funding);
                em.persist(article);
                tr.commit();
                em.close();
                return true;
            } else {
                em.close();
                return false;
            }
        } catch (Exception e){
            e.printStackTrace();
            tr.rollback();
            em.close();
            return false;
        }


    }


    /**
     * 프로젝트 3단계 호출
     * @param projectId 저장할 프로젝트 Id
     * @return
     */
    public List<Article> getProject_3Level(Long projectId) {
        EntityManager em = JpaConfig.emf.createEntityManager();
        try{
            List<Article> articles = em.createQuery("SELECT a FROM Article a WHERE a.fundingId.id =: projectId")
                    .setParameter("projectId", projectId)
                    .getResultList();
            System.out.println(articles);
            em.close();
            return articles;
        } catch (Exception e){
            e.printStackTrace();
            em.close();
            return null;
        }
    }


    /**
     * 프로젝트 3단계 삭제
     * @param articleId 삭제할 물품 ID
     * @return
     */
    public boolean deleteProject_3Level(Long projectId,Long articleId) {
        EntityManager em = JpaConfig.emf.createEntityManager();
        EntityTransaction tr = em.getTransaction();

        try{
            tr.begin();
            Article article = em.find(Article.class, articleId);
            if (article.getFundingId().getId() == projectId){
                em.remove(article);
            } else{
                em.close();
                return false;
            }
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
     * 썸네일 파일 지우고, 썸네일 테이블에서 지우고, 해당 펀딩 글의 썸네일을 null로 변경
     * @param id 썸네일이 변경될 펀딩 글
     * @return 정상처리 true, 비정상처리 false
     */
    public boolean deleteThumbnail(Long id) {
        EntityManager em = JpaConfig.emf.createEntityManager();
        EntityTransaction tr = em.getTransaction();

        try{
            Funding funding = em.find(Funding.class, id);
            tr.begin();
            Thumbnail thumbnail = em.find(Thumbnail.class, funding.getThumbnail().getImage());
            fileService.deleteImage(thumbnail.getImage(),beanConfig.THUMBNAIL_DIRECTORY_NAME);
            em.remove(thumbnail);
            funding.setThumbnail(null);
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
