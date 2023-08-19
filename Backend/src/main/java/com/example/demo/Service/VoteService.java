package com.example.demo.Service;

import com.example.demo.Config.JpaConfig;
import com.example.demo.Entity.CompoSitekey.VotePK;
import com.example.demo.Entity.Vote;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import java.util.List;

@Service
@NoArgsConstructor
@Data
public class VoteService {

    /**
     * 찜
     *
     * @URL /vote
     * @method POST
     * @param vote userId와 fundingId가 담겨있는 객체
     * @return 저장 성공 true, 저장 실패 false
     */
    public boolean createVote(Vote vote){
        EntityManager em = JpaConfig.emf.createEntityManager();
        EntityTransaction tr = em.getTransaction();
        try{
            tr.begin();
            em.persist(vote);
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
     * 특정 글의 찜 확인
     *
     * @URL /vote
     * @method GET
     * @param votePk userId, fundingId가 담긴 조회할 votePK 객체
     * @return 좋아요 상태 true, 좋아요를 누르지 않은 상태 false
     */
    public boolean getVote(VotePK votePk){
        EntityManager em = JpaConfig.emf.createEntityManager();
        if (em.find(Vote.class, votePk) != null){
            em.close();
            return true;
        } else {
            em.close();
            return false;
        }
    }


    /**
     * 특정 유저 찜 목록 호출
     *
     * @URL /votes
     * @method GET
     * @param userId 확인할 유저의 userId
     * @return List<Vote> 타입의 Vote 목록
     */
    public List<Vote> getVotes(Long userId) {
        EntityManager em = JpaConfig.emf.createEntityManager();
        return (List<Vote>) em.createQuery("SELECT v FROM Vote v WHERE v.userId =: userId")
                .setParameter("userId", userId)
                .getResultList();
    }

    /**
     * 특정 찜을 삭제
     *
     * @URL /vote
     * @method DELETE
     * @param votePk userId, fundingId를 담고있는 VotePK 객체
     * @return 정상 삭제 true, 삭제실패 false
     */
    public boolean deleteVote(VotePK votePk) {
        EntityManager em = JpaConfig.emf.createEntityManager();
        EntityTransaction tr = em.getTransaction();
        try {
            tr.begin();
            Vote vote = em.find(Vote.class, votePk);
            em.remove(vote);
            tr.commit();
            em.close();
            return true;
        } catch (Exception e){
            tr.rollback();
            em.close();
            return false;
        }
    }



}
