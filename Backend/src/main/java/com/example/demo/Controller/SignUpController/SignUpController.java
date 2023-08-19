package com.example.demo.Controller.SignUpController;

import com.example.demo.Config.AES256;
import com.example.demo.Config.BeanConfig;
import com.example.demo.Entity.*;
import com.example.demo.Controller.SignUpController.DTO.SignUpRequest;
import com.example.demo.Repository.EmailAuthRepo;
import com.example.demo.Repository.UserRepo;
import com.example.demo.Service.MailService;
import com.example.demo.Service.PointService;
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
    private PointService pointService;

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
        emailAuth.setAuthCode(CODE);
        emailAuth.setSecretKey(secretKey);
        emailAuth.setEmail(encryptEmail);

        if (users.size() == 1) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);                                                           // 넘어온 email을 다른 사용자가 사용중
        }
        else if (    user.isEmail()                                                                                     // email 검증식 통과
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
     * @param signUpRequest SignUpRequest 객체 authCode, email에 값이 담겨져 있음
     * @return 인증 완료시 HttpStatus와 secretKey 함께 반환
     */
    @RequestMapping(value = "/user/auth/check", method = RequestMethod.POST)
    public ResponseEntity<Object> checkEmailAuthCode(@RequestBody final SignUpRequest signUpRequest) {

        EmailAuth emailAuth = new EmailAuth();
        emailAuth.setEmail(signUpRequest.getEmail());
        emailAuth.setAuthCode(signUpRequest.getAuthCode());
        emailAuth.setSecretKey(mailService.checkEmailAuthCode(emailAuth));

        if (emailAuth.getSecretKey() == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }else {
            emailAuth.setEmail(null);
            emailAuth.setAuthCode(null);
            return new ResponseEntity<>(emailAuth, HttpStatus.OK);
        }
    }


    /**
     * 이메일 발송 코드 인증을 마치고 회원을 생성
     * @param request 회원가입 양식(email, nickName, pwd)를 담고있는 User 객체
     * @return 정상 생성시 HttpStatus.NO_CONTENT 반환
     */
    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public ResponseEntity<Object> createUser(@RequestBody SignUpRequest request) {
        String encryptEmail = "";
        try {
            encryptEmail = aes256.encrypt(request.getEmail());                                                          // User 객체의 email 양방향 암호화
        } catch (Exception e){
            e.printStackTrace();
        }
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String now = dateFormat.format(new Timestamp(System.currentTimeMillis()));                                      // 계정 생성 시간, 로그아웃 시간 초기화에 사용


        EmailAuth emailAuth = new EmailAuth();
        emailAuth.setEmail(encryptEmail);


        User tempUser = new User();                                                                                     // 검증식을 위해 사용될 User 객체
        tempUser.setEmail(request.getEmail());
        tempUser.setNickName(request.getNickName());
        tempUser.setPassword(request.getPassword());

        User user = new User();
        user.setIdType(new IdType(0));
        user.setState(new State(0));
        user.setPassword(bCryptPasswordEncoder.encode(request.getPassword()));                                          // User 객체의 pwd 단방향 암호화
        user.setEmail(encryptEmail);
        user.setCreatedAt(now);
        user.setLogoutAt(now);
        user.setNickName(request.getNickName());

        List<EmailAuth> emailAuths = emailAuthRepo.getEmailAuthCountToSecretKeyAndEmail(emailAuth);

        if (    emailAuths != null
                && (emailAuths.get(0).getSecretKey().equals(request.getSecretKey()))                                    // SecretKey와 Email이 매칭된 튜플이 존재
                && (tempUser.isEmail() && tempUser.isNickName() && tempUser.isPwd())                                    // email, nickName, pwd 셋 다 통과
                && userRepo.save(user)
                ) {                                                                                                     // User 테이블에 요청온 User 객체 저장 성공
            emailAuthRepo.deleteEmailAuthToSecretKeyAndEmail(emailAuth);
            pointService.chargePoint(user.getUserId(), 5000L, "회원가입 이벤트");
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);                                                        // 그 외에 모든 경우(secretKey 인증 실패 or 검증식 통과 실패 or User 객체 저장 실패 등등...)
        }
    }

}
