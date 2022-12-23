package com.example.demo.Controller;

import com.example.demo.Config.AES256;
import com.example.demo.Config.BeanConfig;
import com.example.demo.DTO.EmailAuth;
import com.example.demo.DTO.IdType;
import com.example.demo.DTO.State;
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

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.List;

@Controller
@CrossOrigin("*")
public class SignUpController {

    private static final int DIGIT = 6;                                                                                 // 이메일 인증 코드 자릿수
    private static final int MAX_REQUEST = 5;                                                                           // 이메일 인증 코드 요청 최대 횟수(같은 이메일로 6번 이상 요청 불가)

    @Autowired
    private MailService mailService;

    @Autowired
    private BeanConfig beanConfig;

    @Autowired
    private EmailAuthRepo emailAuthRepo;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;                                                                // 단방향 암호화

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AES256 aes256;                                                                                              // 양방향 암호화


    /**
     * 회원가입 전용 이메일 발송 함수
     * @param email email을 담을 User 객체
     * @return 정상 처리시 HttpStatus.NO_CONTENT, 비정상 처리시 HttpStatus.BAD_REQUEST
     */
    @RequestMapping(value = "/user/auth/email", method = RequestMethod.GET)
    public ResponseEntity<Object> getEmailAuth(@RequestParam final String email){
        String encryptEmail = "";
        try {
            encryptEmail = aes256.encrypt(email);                                                                       // 이메일 양방향 암호화
        } catch (Exception e){
            e.printStackTrace();
        }

        final String CODE = mailService.getEmailAuthCode(DIGIT);                                                        // 이메일 인증 코드 생성
        final String secretKey =
                bCryptPasswordEncoder.encode(email + "music_meet" + beanConfig.getJwtKey());                // (이메일 + "music_meet" + jwt 토큰 값) + 단방향 암호화

        User user = new User();                                                                                         // UserRepo에서 이메일로 User 테이블에서 조회할 때 사용할 변수
        user.setEmail(encryptEmail);
        List<User> users = userRepo.findUserToEmail(user);                                                              // User 테이블에서 해당 이메일을 조회
        user.setEmail(email);                                                                                           // 이메일 검증식을 위해 다시 복호화한 이메일로 바꿔줘야됨

        EmailAuth emailAuth = new EmailAuth();
        emailAuth.setCode(CODE);
        emailAuth.setSecretKey(secretKey);
        emailAuth.setEmail(encryptEmail);

        if (    user.isEmail()                                                                                              // email 검증식 통과
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

        EmailAuth emailAuth = new EmailAuth();
        emailAuth.setSecretKey(mailService.checkEmailAuthCode(request));
        if (emailAuth.getSecretKey() == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }else {
            return new ResponseEntity<>(emailAuth, HttpStatus.OK);
        }
    }


    /**
     * 이메일 발송 코드 인증을 마치고 회원을 생성
     * @param request 회원가입 양식(email, nickName, pwd)를 담고있는 User 객체
     * @return 정상 생성시 HttpStatus.NO_CONTENT 반환
     */
    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public ResponseEntity<Object> createUser(@RequestBody User request) {
        String encryptEmail = "";
        try {
            encryptEmail = aes256.encrypt(request.getEmail());                                                          // User 객체의 email 양방향 암호화
        } catch (Exception e){
            e.printStackTrace();
        }
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        EmailAuth emailAuth = new EmailAuth();                                                                          // emailAuthRepo.getEmailAuthCountToSecretKeyAndEmail()에서 사용될 객체
        emailAuth.setSecretKey(request.getAuthCode());
        emailAuth.setEmail(encryptEmail);

        User tempUser = new User();                                                                                     // 검증식을 위해 사용될 User 객체
        tempUser.setEmail(request.getEmail());
        tempUser.setNickName(request.getNickName());
        tempUser.setPwd(request.getPwd());

        request.setIdType(new IdType(0));
        request.setState(new State(0));
        request.setPwd(bCryptPasswordEncoder.encode(request.getPwd()));                                                 // User 객체의 pwd 단방향 암호화
        request.setEmail(encryptEmail);
        request.setCreatedAt(dateFormat.format(new Timestamp(System.currentTimeMillis())));

        if ((emailAuthRepo.getEmailAuthCountToSecretKeyAndEmail(emailAuth) == 1)                                        // SecretKey와 Email이 매칭된 튜플이 존재
                && (tempUser.isEmail() && tempUser.isNickName() && tempUser.isPwd())                                       // email, nickName, pwd 셋 다 통과
                && userRepo.save(request)) {                                                                            // User 테이블에 요청온 User 객체 저장 성공
            emailAuthRepo.deleteEmailAuthToSecretKeyAndEmail(emailAuth);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);                                                        // 그 외에 모든 경우(secretKey 인증 실패 or 검증식 통과 실패 or User 객체 저장 실패 등등...)
        }
    }

}
