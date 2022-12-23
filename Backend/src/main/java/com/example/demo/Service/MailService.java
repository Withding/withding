package com.example.demo.Service;

import com.example.demo.Config.AES256;
import com.example.demo.DTO.EmailAuth;
import com.example.demo.DTO.User;
import com.example.demo.Repository.EmailAuthRepo;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Data
@NoArgsConstructor
public class MailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private EmailAuthRepo emailAuthRepo;

    @Autowired
    private AES256 aes256;


    /**
     * 회원가입 전용 이메일 발송
     * @param email 발송할 대상
     */
    public boolean sendSignUpCode(final String email, final String CODE) {
        System.setProperty("mail.smtp.ssl.protocols", "TLSv1.2");
        boolean result = false;

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        String htmlMsg = "<p> 해당 코드를 입력해주세요. </p> <br> <p>" + CODE + "</p>";                    // 메일 내용에 삽입될 부분
        //mimeMessage.setContent(htmlMsg, "text/html"); /** Use this or below line **/
        try {
            helper.setTo(email); // 받는 사람
            helper.setSubject("Withding 가입 안내 코드입니다."); // 메일 제목
            helper.setText(htmlMsg, true); // 메일 내용
            helper.setFrom("amusicmeet@gmail.com"); // 보내는 사람
            javaMailSender.send(mimeMessage);
            result = true;
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
        return result;
    }


    /**
     * Stirng 타입의 랜덤 숫자 코드를 생성하는 함수
     * @param digit 자릿수
     * @return String 타입의 숫자
     */
    public String getEmailAuthCode(int digit){
        char[] strs = {'0','1','2','3','4','5','6','7','8','9'};
        String code = "";
        // Math.random() * ( 최대값 - 최소값 )  ) + 최소값
        for(int i = 0; i < digit; i++){
            code = code + strs[(int)(Math.random() * (strs.length - 0) + 0)];
        }
        return code;
    }


    /**
     * 이메일 인증 코드 확인
     * @param request authCode를 담고있는 User 객체
     * @return 정상 처리시 sectetKey 반환, 비정상상시 null 반환
     */
    public String checkEmailAuthCode(User request) {
        String secretKey = null;
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");                               // 패턴의 대소문자 정확히 구분해줘야됨 대소문자 차이로 값이 이상해질 수 있음

        EmailAuth emailAuth = new EmailAuth();
        emailAuth.setCode(request.getAuthCode());
        try{
            emailAuth.setEmail(aes256.encrypt(request.getEmail()));
        } catch (Exception e) {
            e.printStackTrace();
        }

        List<EmailAuth> emailAuths = emailAuthRepo.findEmailAuthToCodeAndEmail(emailAuth);                              // 조회
        final Date now = new Date(System.currentTimeMillis());                                                          // 현재 시간을 Date 객체에 저장
        Date deadLine;                                                                                                  // deadLine(만료시간)을 담을 변수

        if (emailAuths.size() != 0){
            try {
                deadLine = dateFormat.parse(emailAuths.get(0).getDeadLine());                                           // Date 타입 변수에 만료시간 대입
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }

            if (now.before(deadLine)){                                                                                  // now.before(deadLine) -> now가 deadLine 보다 이전(before)이다. -> ture
                secretKey = emailAuths.get(0).getSecretKey();
            }
        }
        return secretKey;
    }


    /**
     * 30분에 한번씩 EmailAuth 테이블을 지우는 함수, deadLine 값이 현재시간 - 30분 보다 작으면 삭제
     */
    @Scheduled(fixedRate = 1000 * 60 * 30)                                                                              // 30분에 한 번씩 실행
    public void scheduler() {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        emailAuthRepo.deleteEmailAuthToDeadLine(dateFormat.format(new Timestamp(System.currentTimeMillis() - (1000 * 60 * 25)))); // 현재시간 - 25분 이전의 deadLine에 해당하는 튜플들 모두 삭제
    }
}
