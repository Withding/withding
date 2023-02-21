package com.example.demo.Service;

import com.example.demo.Config.BeanConfig;
import com.example.demo.Config.JpaConfig;
import com.example.demo.DTO.*;
import com.example.demo.DTO.Response.GetMyProjects;
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



    /**
     * 해당 유저가 글을 작성하던 유저인지 확인하고 해당 프로젝트의 상태가 작성중인지 확인
     * @param requestUser 작성을 요청한 유저
     * @param id 작성 요청한 프로젝트 Id
     * @return 작성자가 맞고, 해당 프로젝트 글이 작성중인 상태라면 true, 아니면 false
     */
    public boolean isUserToProject(User requestUser, Long id) {
        EntityManager em = JpaConfig.emf.createEntityManager();

        try{
            Funding funding = em.find(Funding.class, id);
            User findUser = funding.getUserId();
            int fundingStateCode = funding.getFundingStateCode().getStateCode();
            if (requestUser.getUserId() == findUser.getUserId() || fundingStateCode == 4){
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
                getProject_1Level.setEndDate(funding.getDeadLine().substring(0,10));
            }
            if (funding.getStartEnd() == null){
                getProject_1Level.setStartDate("");
            }else {
                getProject_1Level.setStartDate(funding.getStartEnd().substring(0,10));
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
    public Article createProject_3Level(Long projectId, Article article) {
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
            if (article.articleValidate() == false)     // article.articleValidate() == false -> 물품 유효성 오류
            {
                return null;
            }
            else if (article.getShippingDay().length() <= 19) {
                nowString = dateFormat.format(timestamp);
                nowDate = dateFormat.parse(nowString);
                sendDate = dateFormat.parse(article.getShippingDay() + " 00:00:00");

                // 배송일 검증 (오늘 기준으로 배송일이 과거이거나 오늘날짜라면 오류, 내일부터 가능)
                if (!sendDate.after(nowDate)){
                    em.close();
                    return null;
                }
            }

            if (projectCount <= beanConfig.getMaxProjectArticleCount()){                                                // DB에 저장된 물품이 5개 미만일때
                Funding funding = em.find(Funding.class, projectId);
                tr.begin();
                article.setFundingId(funding);
                em.persist(article);
                tr.commit();
                em.clear();
                em.find(Article.class, article.getId());
                em.close();
                article.setShippingDay(article.getShippingDay().substring(0,10));
                return article;
            } else {
                em.close();
                return null;
            }
        } catch (Exception e){
            e.printStackTrace();
            tr.rollback();
            em.close();
            return null;
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


    /**
     * 프로젝트 최종 유효성 검사 후 stateCode를 수정하여 최종 등록하는 함수
     * @param projectId 프로젝트 Id
     * @return 통과 = "0", 1단계 유효성 검사 실패 = "1", 2단계 유효성 검사 실패 = "2", 3단계 유효성 검사 실패 = "3", 비정상 처리 = "4",
     */
    public String validateProject(Long projectId) {
        EntityManager em = JpaConfig.emf.createEntityManager();
        EntityTransaction tr = em.getTransaction();

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String startStr = dateFormat.format(new Timestamp(System.currentTimeMillis()));

        try{
            Funding funding = em.find(Funding.class, projectId);

            String fundingValidateStateCode = fundingValidate(funding);
            switch (fundingValidateStateCode){
                case "0":               // 통과
                    break;
                case "1":               // 1단계 유효성 검사 실패
                    System.out.println("------------------------------------------------------------------------------");
                    System.out.println("funding.fundingValidate()에러 -> stateCode : " + fundingValidateStateCode);
                    System.out.println("-------------------------------------------------------------------------------");
                    em.close();
                    return "1";
                case "2":               // 2단계 유효성 검사 실패
                    System.out.println("------------------------------------------------------------------------------");
                    System.out.println("funding.fundingValidate()에러 -> stateCode : " + fundingValidateStateCode);
                    System.out.println("------------------------------------------------------------------------------");
                    em.close();
                    return "2";
                case "3":               // 3단계 유효성 검사 실패
                    System.out.println("------------------------------------------------------------------------------");
                    System.out.println("funding.fundingValidate()에러 -> stateCode : " + fundingValidateStateCode);
                    System.out.println("------------------------------------------------------------------------------");
                    em.close();
                    return "3";
                default:                // 비정상 동작(캣치문으로 들어옴) 에러
                    System.out.println("------------------------------------------------------------------------------");
                    System.out.println("funding.fundingValidate()에러 -> stateCode : " + fundingValidateStateCode);
                    System.out.println("------------------------------------------------------------------------------");
                    em.close();
                    return "4";
            }

            Date nowDate = dateFormat.parse(startStr);
            Date startDate = dateFormat.parse(funding.getStartEnd());
            tr.begin();

            // ----------------------------- funding state code를 설정해주는 판별 -------------------------------------------
            if (startDate.after(nowDate) == true) {
                funding.setFundingStateCode(new FundingStateCode(0));
            } else if (startDate.before(nowDate) == true || startDate.getTime() == nowDate.getTime()){
                funding.setFundingStateCode(new FundingStateCode(1));
            } else {
                em.close();
                return "4";
            }
            // ---------------------------------------------------------------------------------------------------------
            tr.commit();
            em.close();
            return "0";
        } catch (Exception e){
            e.printStackTrace();
            tr.rollback();
            em.close();
            return "4";
        }

    }


    /**
     * 펀딩 최종 유효성 검사 함수
     * @param funding 검증할 funding 객체
     * @return 통과 = "0", 1단계 유효성 검사 오류 = "1", 2단계 유효성 검사 오류 = "2", 3단계 유효성 검사 오류 = "3", 비정상 동작 = "4"
     */
    public String fundingValidate(Funding funding) {
        EntityManager em = JpaConfig.emf.createEntityManager();
        EntityTransaction tr = em.getTransaction();

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date startDate;
        Date endDate;
        try {
            startDate = dateFormat.parse(funding.getStartEnd());
            endDate = dateFormat.parse(funding.getDeadLine());
        } catch (Exception e) {
            em.close();
            return "1";             // 원래라면 캣치문으로 빠진 비정상 동작 에러("4")가 맞지만 1단계 날짜의 변환중에 빠진 에러이므로 "1"로 설정
        }

        Long alticleCount = (Long) em.createQuery("SELECT count(a) FROM Article a WHERE a.fundingId.id =: Id")
                            .setParameter("Id", funding.getId())
                            .getSingleResult();

        // 1단계 유효성 검사
        if
        (
                (funding.getTitle() == null || 0 >= funding.getTitle().length() || funding.getTitle().length() >= 41) ||                        // 제목이 null 이거나 제목길이가 0 이거나 제목 길이가 40자를 초과
                        (funding.getThumbnail() == null || funding.getThumbnail().getImage().length() < 20) ||                                 // 썸네일이 null 이거나 썸네일 호출 url이 이상한경우
                        (funding.getMaxAmount() == null || 1000 > funding.getMaxAmount() || funding.getMaxAmount() >= 1000000000) ||     // 목표금액이 null 이거나 목표 금액이 1000원 미만 이거나 10억 초과인 경우
                        (funding.getStartEnd() == null || funding.getDeadLine() == null || endDate.after(startDate) == false)                   // 시작 날짜가 null 이거나 종료 날짜가 null이거나 종료날짜가 시작날짜 보다 앞에 있는 경우
        ) {
            em.close();
            return "1";
        }

        // 2단계 유효성 검사
        else if (funding.getContent() == null || funding.getContent().length() > 1000) {                                // 설명이 null 이거나 1000자를 초과한 경우
            em.close();
            return "2";
        }

        // 3단계 물품 확인
        else if (alticleCount == null || alticleCount == 0){
            em.close();
            return "3";
        }

        // 통과
        else {
            em.close();
            return "0";
        }
    }


    /**
     * 프로젝트 3단계 수정
     * @param projectId 해당 물품이 등록된 펀딩의 Id
     * @param newArticle 등록할 Article 객체
     * @return 정상 처리 true, 비정상 처리 false
     */
    public boolean changeProject_3Level(Long projectId, Article newArticle) {
        EntityManager em = JpaConfig.emf.createEntityManager();
        EntityTransaction tr = em.getTransaction();

        Article article = em.find(Article.class, newArticle.getId());
        if (article == null || article.getFundingId().getId() != projectId){                                            // 해당 물품이 없거나 물품이 등록된 펀딩과 요청으로 날라온 펀딩 ID가 다른 경우
            em.close();
            return false;
        }
        try{
            tr.begin();
            article.setName(newArticle.getName());
            article.setDescription(newArticle.getDescription());
            article.setPrice(newArticle.getPrice());
            article.setShippingPrice(newArticle.getShippingPrice());
            article.setShippingDay(newArticle.getShippingDay() + " 00:00:00");
            article.setInventory(newArticle.getInventory());
            tr.commit();
            em.close();
            return true;
        } catch (Exception e){
            System.out.println("---------------------------------------------------------------------------------------");
            System.out.println("ProjectService().changeProject_3Level() 에러 에러 발생");
            System.out.println("---------------------------------------------------------------------------------------");
            e.printStackTrace();
            tr.rollback();
            em.close();
            return false;
        }




    }


    /**
     * 커서 기반으로 내가 작성한 프로젝트를 목록으로 반환해주는 함수
     * @param user 프로젝트를 작성한 user
     * @param page 호출할 페이지
     * @param cursor 시작점을 가리키는 커서
     * @return
     */
    public List<GetMyProjects> getMyProjects(User user, Long page, Long cursor, int count) {
        if (1 > count || count > 21){
            count = 5;
        }

        EntityManager em = JpaConfig.emf.createEntityManager();

        List<Funding> fundingList = new ArrayList<>();
        if (cursor == null) {
            fundingList = em.createQuery("SELECT f FROM Funding f " +
                            "WHERE f.userId =: user " +
                            "AND f.fundingStateCode.stateCode NOT IN (3)" +
                            "ORDER BY f.createdAt DESC")
                    .setParameter("user", user)
                    .setFirstResult((page.intValue() - 1) * 6 )
                    .setMaxResults(count)
                    .getResultList();
        } else {
            fundingList = em.createQuery("SELECT f FROM Funding f " +
                            "WHERE f.userId =: user " +
                            "AND f.id < :cursor " +
                            "AND f.fundingStateCode.stateCode NOT IN (3)" +
                            "ORDER BY f.createdAt DESC")
                    .setParameter("user", user)
                    .setParameter("cursor", cursor)
                    .setMaxResults(count)
                    .getResultList();
        }
        List<GetMyProjects> getMyProjectsList = new ArrayList<>();

        if (fundingList.size() != 0) {
            for (int i = 0; i < fundingList.size(); i++) {
                GetMyProjects getMyProjects = new GetMyProjects();
                getMyProjects.setId(fundingList.get(i).getId());
                getMyProjects.setState(fundingList.get(i).getFundingStateCode().getState());
                getMyProjects.setTitle(fundingList.get(i).getTitle());


                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Long dateNow = System.currentTimeMillis();
                Long dateOpen = 0L;

                try {
                    dateOpen = dateFormat.parse(fundingList.get(i).getStartEnd()).getTime() - 86400000L;
                }catch (Exception e){

                }

                if (getMyProjects.equals("임시저장") || getMyProjects.equals("진행대기") || (dateNow > dateOpen)) {
                    getMyProjects.setIsDeleteAble(true);
                } else {
                    getMyProjects.setIsDeleteAble(false);
                }

                if (fundingList.get(i).getThumbnail() == null) {
                    getMyProjects.setImage(beanConfig.SERVER_URL + ":" + beanConfig.SERVER_PORT + beanConfig.THUMBNAIL_IMAGE_URL + "default.jpeg");
                } else {
                    getMyProjects.setImage(beanConfig.SERVER_URL + ":" + beanConfig.SERVER_PORT + beanConfig.THUMBNAIL_IMAGE_URL + fundingList.get(i).getThumbnail().getImage());
                }

                getMyProjectsList.add(getMyProjects);
            }
        }
        em.close();
        return getMyProjectsList;
    }


    /**
     * 내가 작성한 프로젝트 글 갯수 호출
     * @param user_id userId
     * @return Long 타입의 내가 작성한 프로젝트 글 갯수
     */
    public Long getCountToUserId(Long user_id) {
        EntityManager em = JpaConfig.emf.createEntityManager();
        Long count = (Long) em.createQuery("SELECT COUNT(f.id) FROM Funding f WHERE f.userId.userId =: user_id")
                .setParameter("user_id", user_id)
                .getSingleResult();
        em.close();
        return count;
    }
}
