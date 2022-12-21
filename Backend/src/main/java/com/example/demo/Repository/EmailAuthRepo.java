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
import java.util.List;

@Repository
public class EmailAuthRepo {

    @Autowired
    private EntityManager em;

    @Autowired
    private EntityTransaction tr;


    /**
     * emailauth 테이블에 데이터 저장
     * @param emailAuth 저장할 EmailAuth 객체
     * @return 정상 저장시 true
     */
    public boolean save(final EmailAuth emailAuth){
        boolean result = false;

        Timestamp timestamp = new Timestamp(System.currentTimeMillis() + (1000 * 60 * 3));  // 현재시간 + 3분
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
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


    /**
     * EmailAuth 테이블에서 특정 이메일의 갯수를 검색 (JPA에서 count()를 사용시 Long을 리턴해줘야됨)
     * @param emailAuth 조회할 이메일을 담고있는 EmailAuth 객체
     * @return 특정 이메일로 저장된 튜플의 갯수
     */
    public Long getEmailAuthCountToEmail(EmailAuth emailAuth){                                                          // JPA에서 count()를 SELECT할땐 Long을 리턴해야됨
        return (Long) em.createQuery("SELECT count(ea.emailAuth_id) FROM EmailAuth ea WHERE ea.email =: email")
                .setParameter("email", emailAuth.getEmail())
                .getSingleResult();
    }


    /**
     * 이메일 인증 코드와 이메일로 EamilAuth 테이블을 조회
     * @param request
     * @return List<EmailAuth> 타입
     */
    public List<EmailAuth> findEmailAuthToCodeAndEmail(EmailAuth request) {
        return em.createQuery("SELECT ea From EmailAuth ea WHERE ea.code =: code AND ea.email =: email")
                .setParameter("code", request.getCode())
                .setParameter("email", request.getEmail())
                .getResultList();
    }
}
