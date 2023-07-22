package com.example.demo.Service;

import com.example.demo.Config.JpaConfig;
import com.example.demo.DTO.Follow;
import com.example.demo.Controller.FollowController.DTO.FollowList;
import com.example.demo.DTO.User;
import com.example.demo.Enum.FollowEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import java.util.List;

@Service
public class FollowService {

    /**
     * 해당 user의 팔로워 목록 호출
     *
     * @param me 리퀘스트를 호출한 대상
     * @param target 목록을 호출할 대상
     * @return List<Follow> 타입의 목상
     */
    public FollowList getFollowerList(final User me, final User target) {
        EntityManager em = JpaConfig.emf.createEntityManager();
        List<Follow> myFollowList = (List<Follow>)  em.createQuery("SELECT f FROM Follow f WHERE f.follower =: meId")
                .setParameter("meId", me.getUserId())
                .getResultList();
        List<Follow> followerList = (List<Follow>) em.createQuery("SELECT new Follow(f.user.userId, f.follower) FROM Follow f WHERE f.user =: target")
                .setParameter("target", target)
                .getResultList();

        // 나와 관계(팔로우, 팔로워 관계)가 있는지 확인
        for (Follow f: followerList) {
            f.isFollowRelationToMe(myFollowList, FollowEnum.Follower);
        }

        FollowList resultFollowerList = new FollowList();
        resultFollowerList.setFollows(followerList);
        em.close();
        return resultFollowerList;
    }


    /**
     * 해당 target의 팔로우 목록을 호출
     *
     * @param me 리퀘스트를 요청한 대상
     * @param target 목록을 호출할 대상
     * @return List<Follow> 타입의 목록
     */
    public FollowList getFollowList(final User me, final User target){
        EntityManager em = JpaConfig.emf.createEntityManager();
        List<Follow> myFollowList = (List<Follow>)  em.createQuery("SELECT f FROM Follow f WHERE f.follower =: meId")
                .setParameter("meId", me.getUserId())
                .getResultList();
        List<Follow> followList = (List<Follow>) em.createQuery("SELECT new Follow(f.user, f.follower) FROM Follow f WHERE f.follower =: targetId")
                .setParameter("targetId", target.getUserId())
                .getResultList();

        System.out.println("내 팔로우 리스트 : " + myFollowList.get(0).getUser().getUserId());
        System.out.println("타겟 팔로우 리스트 : " + followList.get(0).getUser().getUserId());

        // 나와 관계(팔로우, 팔로워 관계)가 있는지 확인
        for (Follow f: followList) {

            //System.out.println("\n" + f + "\n");
            f.isFollowRelationToMe(myFollowList, FollowEnum.Follow);
        }

        FollowList resultFollowList = new FollowList();
        resultFollowList.setFollows(followList);
        em.close();
        return resultFollowList;
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
            em.persist(new Follow(target, user.getUserId()));
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
     * @param unfollowNum 팔로우 해제할 사람
     * @return 정상 true, 비정상 false
     */
    public boolean unFollow(User user, Long unfollowNum){
        EntityManager em = JpaConfig.emf.createEntityManager();
        EntityTransaction tr = em.getTransaction();

        User unfollwer = em.find(User.class, unfollowNum);
        Long followId = (Long)em.createQuery("SELECT f.follow_id FROM Follow f WHERE f.follower =: me AND f.user =: unfollower")
                .setParameter("me", user.getUserId())
                .setParameter("unfollower", unfollwer)
                .getSingleResult();
        Follow follow = em.find(Follow.class, followId);
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
