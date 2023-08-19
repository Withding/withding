package com.example.demo.Controller.LoginController;

import com.example.demo.Config.BeanConfig;
import com.example.demo.Controller.LoginController.DTO.Login;
import com.example.demo.Entity.User.User;
import com.example.demo.Service.JwtService;
import com.example.demo.Service.LoginService;
import com.example.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

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



    /**
     * 카카오 로그인
     * @param request 카카오 API에서 받은 엑세스 토큰 (json)
     * @return 닉네임, 스테이터스 코드
     */
    @RequestMapping(value = "/auth/kakao", method = RequestMethod.POST)
    public ResponseEntity<Object> kakaoauth(@RequestBody final User request){

        User user = loginService.kakaoLogin(request.getAccessToken());
        System.out.println(user);
        if (user == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        else {
            return new ResponseEntity (
                    new Login(
                            jwtService.generateJwtToken(user.getUserId(), user.getNickName(), user.getLoginTime())
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
    public ResponseEntity<Object> login(@RequestBody User request){

        Login login = loginService.login(request);                                                                      // 로그인 가능여부 검증
        if (login != null) {
            return new ResponseEntity<>(login, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }


    /**
     * withding 로그아웃
     * @param request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @return
     */
    @RequestMapping(value = "/logout", method = RequestMethod.HEAD)
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
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


}
