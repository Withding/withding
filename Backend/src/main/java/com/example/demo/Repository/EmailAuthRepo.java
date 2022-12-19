package com.example.demo.Repository;

import com.example.demo.DTO.EmailAuth;
import com.example.demo.DTO.User;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

@Repository
public class EmailAuthRepo {

    @Autowired
    private EntityManager em;

    @Autowired
    private EntityTransaction tr;

    /**
     * emailauth 테이블에 데이터 저장
     * @param email 발송한 이메일
     * @param code 발송한 코드
     * @return 정상 저장시 true
     */
    public boolean save(final String email, final String code){
        boolean result = false;

        EmailAuth emailAuth = new EmailAuth();
        emailAuth.setEmail(email);
        emailAuth.setCode(code);

        Timestamp timestamp = new Timestamp(System.currentTimeMillis() + (1000 * 60 * 3));  // 현재시간 + 3분
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        emailAuth.setDeadLine(dateFormat.format(timestamp));
        try {
            tr.begin();
            em.persist(emailAuth);
            tr.commit();
            em.clear();
            result = true;
        }catch (Exception e){
            tr.rollback();
            e.printStackTrace();
        }

        return result;
    }

}
