package com.example.demo.Controller;

import com.example.demo.Config.BeanConfig;
import com.example.demo.DTO.Response.ResponseLogin;
import com.example.demo.DTO.User;
import com.example.demo.Service.JwtService;
import com.example.demo.Service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
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
    private JwtService jwtService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    /**
     * 카카오 로그인
     * @param request 카카오 API에서 받은 엑세스 토큰 (json)
     * @param servletResponse 쿠키를 담을 리스폰스
     * @return 닉네임, 스테이터스 코드
     */
    @RequestMapping(value = "/auth/kakao", method = RequestMethod.POST)
    public ResponseEntity<Object> kakaoauth(@RequestBody final User request, HttpServletResponse servletResponse){
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        User user = loginService.kakaoLogin(request.getAccessToken());

        if (user.getNickName() == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        else {
            String jwt = jwtService.generateJwtToken(user.getUserId(), user.getNickName(), dateFormat.format(new Timestamp(System.currentTimeMillis())));

            Cookie cookie = new Cookie("jwt",jwt); // create a cookie
            cookie.setMaxAge(7 * 24 * 60 * 60); // expires in 7 days
            // optional properties
            //cookie.setSecure(true);
            cookie.setHttpOnly(true);
            cookie.setPath("/");

            servletResponse.addCookie(cookie); // add cookie to response

            return new ResponseEntity<>(user, HttpStatus.CREATED);
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
            ResponseLogin responseLogin = new ResponseLogin(
                    jwtService.generateJwtToken(user.getUserId(), user.getNickName(), dateFormat.format(new Timestamp(System.currentTimeMillis())))
                    , user.getNickName());
            return new ResponseEntity<>(responseLogin, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }


}
