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


    public boolean createProject(Funding funding){


        List<Funding> fundingList =
                (List<Funding>) em.createQuery("SELECT f FROM Funding f WHERE f.userId.userId =: userId " +
                        "AND f.fundingStateCode.stateCode =: stateCode")
                .setParameter("userId", funding.getUserId().getUserId())
                .setParameter("stateCode", 4)
                .getResultList();
        try{
            tr.begin();
            if (fundingList.size() == 0){ // 디비에 임시저장해둔 펀딩이 없다
                em.persist(funding);        // 새글 등록
            } else {
                Funding old_funding = fundingList.get(0);
                em.persist(old_funding);      // 디비에 존재
                old_funding = funding;

            }

            tr.commit();
            return true;
        } catch (Exception e){
            tr.rollback();
            e.printStackTrace();
            return false;
        }


    }



}
