package com.example.demo.Controller;

import com.example.demo.Config.BeanConfig;
import com.example.demo.DTO.Response.MyPage;
import com.example.demo.DTO.User;
import com.example.demo.Repository.UserRepo;
import com.example.demo.Service.MyPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

@Controller
@CrossOrigin("*")
public class MyPageController {

    @Autowired
    private MyPageService myPageService;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private BeanConfig beanConfig;

    @RequestMapping(value = "/user/mypage", method = RequestMethod.GET)
    public ResponseEntity<Object> getMyPage(HttpServletRequest request){
        HttpServletRequest request2 = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        System.out.println(request2.getAttribute("userNum"));
        User user;

        System.out.println("컨트롤러 안 : " + request2.getAttribute("userNum"));
        if (request.getAttribute("userNum") == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }else {
            user = myPageService.setUserToHttpServletRequestAttribute(request);                                         // HttpServletRequest의 Attribute에서 값을 얻어서 User에 넣은 후 반환
            user = userRepo.getUserToUserId(user);
        }
        MyPage myPage = myPageService.setMyPage(user);

        return new ResponseEntity<>(myPage,HttpStatus.OK);
    }
}
