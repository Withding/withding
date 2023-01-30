package com.example.demo.Controller;

import com.example.demo.Config.BeanConfig;
import com.example.demo.DTO.Response.Login;
import com.example.demo.DTO.User;
import com.example.demo.Service.JwtService;
import com.example.demo.Service.LoginService;
import com.example.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

@Controller
@CrossOrigin("*")
public class LoginController {

    @Autowired
    private BeanConfig beanConfig;

    @Autowired
    private LoginService loginService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    /**
     * 카카오 로그인
     * @param request 카카오 API에서 받은 엑세스 토큰 (json)
     * @return 닉네임, 스테이터스 코드
     */
    @RequestMapping(value = "/auth/kakao", method = RequestMethod.POST)
    public ResponseEntity<Object> kakaoauth(@RequestBody final User request){
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        User user = loginService.kakaoLogin(request.getAccessToken());

        if (user.getNickName() == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        else {
            return new ResponseEntity (
                    new Login(
                            jwtService.generateJwtToken(user.getUserId(), user.getNickName(), dateFormat.format(new Timestamp(System.currentTimeMillis())))
                            , user.getNickName()
                            ,beanConfig.SERVER_URL + ":" + beanConfig.SERVER_PORT + beanConfig.PROFILE_IMAGE_URL + user.getProfileImage().getProfileImage()
                    )
                    , HttpStatus.OK
            );
        }

    }


    /**
     * withding 로그인
     * @param request email과 password가 담겨있는 User 객체
     * @return 정상 처리시 accessToken에 jwt와 HttpStatus.OK 리턴
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<Object> login(@RequestBody final User request){

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        User user = loginService.login(request);
        if (user.getUserId() != null && bCryptPasswordEncoder.matches(request.getPassword(), user.getPassword()) == true) {
            Login responseLogin = new Login(
                    jwtService.generateJwtToken(user.getUserId(), user.getNickName(), dateFormat.format(new Timestamp(System.currentTimeMillis())))
                    , user.getNickName()
                    ,beanConfig.SERVER_URL + ":" + beanConfig.SERVER_PORT + beanConfig.PROFILE_IMAGE_URL + user.getProfileImage().getProfileImage()
            );
            return new ResponseEntity<>(responseLogin, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }


    /**
     * withding 로그아웃
     * @param request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @return
     */
    @RequestMapping(value = "/user/logout", method = RequestMethod.PUT)
    public ResponseEntity<Object> logout(HttpServletRequest request) {
        // ------------------------------ 인증 --------------------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        if (user == null){                                                                                              // 인증
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------
        if (loginService.logout(user) == true){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }


}
