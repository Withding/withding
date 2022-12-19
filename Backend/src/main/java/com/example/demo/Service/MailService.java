package com.example.demo.Service;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Random;

@Service
@Data
@NoArgsConstructor
public class MailService {

    @Autowired
    private JavaMailSender javaMailSender;

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


}
