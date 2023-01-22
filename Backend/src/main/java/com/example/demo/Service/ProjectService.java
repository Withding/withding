package com.example.demo.Service;

import com.example.demo.DTO.Funding;
import com.example.demo.DTO.FundingCategory;
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
    private EntityManager em;

    @Autowired
    private EntityTransaction tr;




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
    public Long createProject(Funding funding){
        // ------------------------------------------------------ 조회 --------------------------------------------------
        List<Funding> fundingList =
                (List<Funding>) em.createQuery("SELECT f FROM Funding f WHERE f.userId.userId =: userId " +
                        "AND f.fundingStateCode.stateCode =: stateCode")
                .setParameter("userId", funding.getUserId().getUserId())
                .setParameter("stateCode", 4)
                .getResultList();
        // -------------------------------------------------------------------------------------------------------------

        try{
            tr.begin();
            // ------------------------------------------ 디비에 임시저장된 글이 없다 ------------------------------------------
            if (fundingList.size() == 0){
                em.persist(funding);                                                                                    // 새글 등록
                //System.out.println("디비에 없음. Id = " + funding.getId());
            }
            // ---------------------------------------------------------------------------------------------------------

            // ------------------------------------------ 디비에 임시저장된 글이 있다 -----------------------------------------
            else {
                funding.setId(fundingList.get(0).getId());
                //System.out.println("디비에 있음. Id =  " + funding.getId());
                changeFundingToFundingId_UseOnlyCreateProject(funding);                                                    // 업데이트
            }
            // ---------------------------------------------------------------------------------------------------------
            tr.commit();
            return funding.getId();
        } catch (Exception e){
            tr.rollback();
            e.printStackTrace();
            return null;
        }
    }


    /**
     * 프로젝트 1단계 임시저장에서 저장할 Funding 객체를 넘겨받아 업데이트 진행
     * 오직 프로젝트 1단계 저장에서만 사용해야함
     * @param funding 저장할 Funding 객체
     */
    private void changeFundingToFundingId_UseOnlyCreateProject(Funding funding) {
        em.createQuery("UPDATE Funding f SET " +
                        "f.title =: title, " +
                        "f.thumbnail =: thumbnail," +
                        "f.maxAmount =: maxAmount," +
                        //"f.startEnd =: startEnd," +
                        //"f.deadline =: deadLine," +
                        "f.createdAt =: createdAt " +
                        "WHERE f.id =: id")
                .setParameter("title", funding.getTitle())
                .setParameter("thumbnail", funding.getThumbnail())
                .setParameter("maxAmount", funding.getMaxAmount())
                //.setParameter("startEnd", funding.getStartEnd())
                //.setParameter("deadLine", funding.getDeadline())
                .setParameter("createdAt", funding.getCreatedAt())
                .setParameter("id", funding.getId())
                .executeUpdate();
    }

}
