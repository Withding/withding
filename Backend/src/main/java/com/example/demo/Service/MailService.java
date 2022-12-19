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
    public void sendSignUpCode(String email) {
        //System.setProperty("https.protocols", "TLSv1,TLSv1.1,TLSv1.2");
        System.setProperty("mail.smtp.ssl.protocols", "TLSv1.2");
        System.setProperty("mail.pop3s.ssl.protocols", "TLSv1.2");

        String str = String.valueOf((int)(Math.random() * 1000000) % 999999);

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        String htmlMsg = "<p> 해당 코드를 입력해주세요. </p> <br> <p>" + str + "</p>";                    // 메일 내용에 삽입될 부분
        //mimeMessage.setContent(htmlMsg, "text/html"); /** Use this or below line **/
        try {
            helper.setTo(email); // 받는 사람
            helper.setSubject("Withding 가입 안내 코드입니다."); // 메일 제목
            helper.setText(htmlMsg, true); // 메일 내용
            helper.setFrom("amusicmeet@gmail.com"); // 보내는 사람
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

        javaMailSender.send(mimeMessage);
    }


}
