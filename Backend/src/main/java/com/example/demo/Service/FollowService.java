package com.example.demo.Service;

import com.example.demo.Config.JpaConfig;
import com.example.demo.DTO.Follow;
import com.example.demo.Controller.FollowController.DTO.GetFollowList;
import com.example.demo.DTO.User;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import java.util.List;

@Service
public class FollowService {


    /**
     * 해당 user의 팔로우 목록을 호출
     * @param user 목록을 호출할 대상
     * @return List<Follow> 타입의 목록
     */
    public GetFollowList getFollowList(final User user){
        EntityManager em = JpaConfig.emf.createEntityManager();
        List<Follow> followList = (List<Follow>) em.createQuery("SELECT new Follow(f.follow_id, f.follower) FROM Follow f WHERE f.user =: user")
                .setParameter("user", user)
                .getResultList();
        GetFollowList getFollowList = new GetFollowList();
        getFollowList.setFollows(followList);
        em.close();
        return getFollowList;
    }



    /**
     * 팔로우 함수
     * @param user 팔로우 하는 사람
     * @param targetId 팔로우 당하는 사람
     * @return 정상처리 true, 비정상 처리 false
     */
    public boolean follow(User user, Long targetId){
        EntityManager em = JpaConfig.emf.createEntityManager();
        EntityTransaction tr = em.getTransaction();

        User target = em.find(User.class, targetId);
        Long followNum = (Long) em.createQuery("SELECT COUNT(f) FROM Follow f WHERE f.user =: user AND f.follower =: targetId")
                .setParameter("user", user)
                .setParameter("targetId", targetId)
                .getSingleResult();

        // 존재하지 않는 사람 팔로우 || 이미 팔로우를 했음 || 정지, 탈퇴한 사람을 팔로우
        if (target == null || followNum >= 1 || target.getState().getStateCode() != 0){
            em.close();
            return false;
        }

        try{
            tr.begin();
            em.persist(new Follow(user, targetId));
            tr.commit();
            em.close();
        } catch (Exception e){
            e.printStackTrace();
            tr.rollback();
            em.close();
            return false;
        }
        return true;
    }



    /**
     * 언팔로우 함수
     * @param user
     * @param followId 삭제할 팔로우
     * @return 정상 true, 비정상 false
     */
    public boolean unFollow(User user, Long followId){
        EntityManager em = JpaConfig.emf.createEntityManager();
        EntityTransaction tr = em.getTransaction();

        Follow follow = em.find(Follow.class, followId);
        System.out.println(follow);
        if (follow == null || follow.getUser().equals(user)){
            em.close();
            return false;
        }
        try {
            tr.begin();
            em.remove(follow);
            tr.commit();
            em.close();
            return true;
        }catch (Exception e) {
            e.printStackTrace();
            tr.rollback();
            em.close();
            return false;
        }
    }

}
