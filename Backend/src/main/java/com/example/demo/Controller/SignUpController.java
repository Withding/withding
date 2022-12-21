package com.example.demo.Controller;

import com.example.demo.Config.BeanConfig;
import com.example.demo.DTO.EmailAuth;
import com.example.demo.DTO.User;
import com.example.demo.Repository.EmailAuthRepo;
import com.example.demo.Repository.UserRepo;
import com.example.demo.Service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin("*")
public class SignUpController {

    private static final int DIGIT = 6;                                                                                 // 이메일 인증 코드 자릿수
    private static final int MAX_REQUEST = 6;                                                                           // 이메일 인증 코드 요청 최대 횟수(같은 이메일로 6번 이상 요청 불가)

    @Autowired
    private MailService mailService;

    @Autowired
    private BeanConfig beanConfig;

    @Autowired
    private EmailAuthRepo emailAuthRepo;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserRepo userRepo;



    /**
     * 회원가입 전용 이메일 발송 함수
     * @param email email을 담을 User 객체
     * @return 정상 처리시 HttpStatus.NO_CONTENT, 비정상 처리시 HttpStatus.BAD_REQUEST
     */
    @RequestMapping(value = "/user/auth/email", method = RequestMethod.GET)
    public ResponseEntity<Object> getEmailAuth(@RequestParam final String email){
        final String CODE = mailService.getEmailAuthCode(DIGIT);                                                        // 이메일 인증 코드 생성
        final String secretKey =
                bCryptPasswordEncoder.encode(email + "music_meet" + beanConfig.getJwtKey());                // (이메일 + "music_meet" + jwt 토큰 값) + 단방향 암호화

        User user = new User();                                                                                         // UserRepo에서 이메일로 User 테이블에서 조회할 때 사용할 변수
        user.setEmail(email);
        List<User> users = userRepo.findToEmail(user);                                                                  // User 테이블에서 해당 이메일을 조회

        EmailAuth emailAuth = new EmailAuth();
        emailAuth.setCode(CODE);
        emailAuth.setEmail(email);
        emailAuth.setSecretKey(secretKey);


        if (user.isEmail()                                                                                              // email 검증식 통과
                && mailService.sendSignUpCode(email, CODE)                                                              // && 메일 전송 성공
                && (users.size() == 0)                                                                                  // && User 테이블에도 해당 이메일이 없음 (회원가입한 적 없음)
                && (emailAuthRepo.getEmailAuthCountToEmail(emailAuth) < MAX_REQUEST))                                   // && EmailAuth 테이블에 해당 이메일로 6번 이상 요청왔을경우 막아버림
        {
            emailAuthRepo.save(emailAuth);                                                                              // emailauth 테이블에 이메일, 코드 저장
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    /**
     * 회원가입 전용 이메일 코드 확인
     * @param request User객체의 authCode, email에 값이 담겨져 있음
     * @return 인증 완료시 HttpStatus와 secretKey 함께 반환
     */
    @RequestMapping(value = "/user/auth/check", method = RequestMethod.POST)
    public ResponseEntity<Object> checkEmailAuthCode(@RequestBody final User request) {

        String secretKey = mailService.checkEmailAuthCode(request);
        if (secretKey == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }else {
            return new ResponseEntity<>(secretKey, HttpStatus.OK);
        }
    }


    @RequestMapping(value = "/user/signup", method = RequestMethod.POST)
    public ResponseEntity<Object> singUp(@RequestBody final User request){




        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
