package com.example.demo.Service;

import com.example.demo.Config.BeanConfig;
import com.example.demo.Config.JpaConfig;
import com.example.demo.Entity.PointHistory.PointHistory;
import com.example.demo.Entity.PointType.PointType;
import com.example.demo.Entity.User.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

@Service
@NoArgsConstructor
@Data
public class PointService {

    @Autowired
    private BeanConfig beanConfig;

    /**
     * 포인트 충전하는 함수 충전시킬 user와 충천할 포인트를 인수로 받는다
     * @param userId 충전 대상의 userId
     * @param point 충전 포인트
     * @return 정상 = true, 비정상 = false
     */
    public boolean chargePoint(Long userId, Long point, String source){
        EntityManager em = JpaConfig.emf.createEntityManager();
        EntityTransaction tr = em.getTransaction();

        try{
            tr.begin();

            User user = em.find(User.class, userId);
            user.setPoint(user.getPoint() + point);

            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            PointHistory pointHistory = new PointHistory();
            pointHistory.setUser(user);
            pointHistory.setPointType(new PointType(0L));
            pointHistory.setSource(source);
            pointHistory.setAtTime(dateFormat.format(new Timestamp(System.currentTimeMillis())));
            pointHistory.setPoint(point);
            em.persist(pointHistory);

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

}
