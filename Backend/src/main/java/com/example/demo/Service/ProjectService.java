package com.example.demo.Service;

import com.example.demo.Config.BeanConfig;
import com.example.demo.DTO.Funding;
import com.example.demo.DTO.FundingCategory;
import com.example.demo.DTO.Response.GetProject_0Level;
import com.example.demo.DTO.Response.GetProject_1Level;
import com.example.demo.DTO.Thumbnail;
import com.example.demo.DTO.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import java.util.List;

@Service
@NoArgsConstructor
@Data
public class ProjectService {

    @Autowired
    private BeanConfig beanConfig;

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
        User findUser = em.find(Funding.class, id).getUserId();
        if (requestUser.getUserId() == findUser.getUserId()){
            return true;
        } else {
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
     * 프로젝트 1단계에서 임시저장하는 함수. 없으면 생성하고 있으면 업데이트 시킴
     * @param funding 임시저장할 객체
     * @return Long 타입의 Funding Id
     */
    public boolean createProject_1Level(Funding funding){
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
            // ------------------------------------------ 디비에 임시저장된 글이 없다 ------------------------------------------
            if (funding.getId() == null){
                em.persist(funding);                                                                                    // 새글 등록
            }
            // ---------------------------------------------------------------------------------------------------------

            // ------------------------------------------ 디비에 임시저장된 글이 있다 ------------------------------------------
            else {
                //System.out.println("디비에 있음. Id =  " + funding.getId());
                Funding f = em.find(Funding.class, funding.getId());                                                    // 영속 관리 시작
                Thumbnail t = em.find(Thumbnail.class, f.getThumbnail().getImage());                                    // 영속 관리 시작
                FundingCategory fc = em.find(FundingCategory.class, funding.getFundingCategory().getId());              // 영속 관리 시작

                em.remove(t);                                                                                           // 기존 썸네일 삭제
                em.persist(funding.getThumbnail());                                                                     // 새로받은 썸네일 저장

                f.setTitle(funding.getTitle());                                                                         // 영속 관리중인 기존 funding 수정 시작
                f.setThumbnail(funding.getThumbnail());
                f.setMaxAmount(funding.getMaxAmount());
                f.setFundingCategory(fc);
                //f.setStartEnd(funding.getStartEnd());
                //f.setDeadLine(funding.getDeadLine());
                f.setCreatedAt(funding.getCreatedAt());

            }
            // ---------------------------------------------------------------------------------------------------------
            tr.commit();                                                                                                // 트랜잭션 시작
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
            tr.begin();                                                                                                 // 트랜젝션 시작
            Funding funding = em.find(Funding.class, projectId);                                                        // 영속성 등록 (persist 말고도 find로 조회해도 영속성으로 관리됨)
            tr.commit();                                                                                                // 트랜젝션 종료
            return new GetProject_1Level(funding.getTitle(), funding.getFundingCategory().getCategory(),
                    funding.getMaxAmount(),null, null,
                    beanConfig.SERVER_URL + ":" + beanConfig.SERVER_PORT +  beanConfig.THUMBNAIL_IMAGE_URL + funding.getThumbnail().getImage(),
                    funding.getUserId().getUserId());
        } catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }


    /**
     * 프로젝트 작성 0단계 호출시 깡통 Funding 테이블을 만들어서 해당 프로젝트의 Id를 반환
     * @param user 세팅할 User 객체
     * @return 깡통으로 생성한 프로젝트 Id
     */
    public Long createProject_0Level(User user) {
        try {
            tr.begin();
            Funding funding = new Funding();
            funding.setUserId(user);
            em.persist(funding);
            tr.commit();
            return funding.getId();
        } catch (Exception e){
            tr.rollback();
            e.printStackTrace();
            return null;
        }
    }



}
