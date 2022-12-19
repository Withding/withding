package com.example.demo.Controller;

import com.example.demo.DTO.User;
import com.example.demo.Repository.EmailAuthRepo;
import com.example.demo.Service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@CrossOrigin("*")
public class SignUpController {

    @Autowired
    private MailService mailService;

    @Autowired
    private EmailAuthRepo emailAuthRepo;


    private final int DIGIT = 6;        // 이메일 인증 자릿수

    /**
     * 회원가입 전용 이메일 발송 함수
     * @param request email을 담을 User 객체
     * @return 정상 처리시 HttpStatus.NO_CONTENT, 비정상 처리시 HttpStatus.BAD_REQUEST
     */
    @RequestMapping(value = "/user/auth/email", method = RequestMethod.GET)
    public ResponseEntity<Object> getEmailAuth(@RequestBody final User request){
        final String CODE = mailService.getEmailAuthCode(DIGIT);                        // 코드 생성
        if (mailService.sendSignUpCode(request.getEmail(), CODE)){                      // 메일로 해당 코드 전송
            emailAuthRepo.save(request.getEmail(), CODE);                               // emailauth 테이블에 이메일, 코드 저장
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/user/auth/check", method = RequestMethod.POST)
    public ResponseEntity<Object> authEmailCode(@RequestBody final User request) {


        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



}
