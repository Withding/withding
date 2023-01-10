package com.example.demo.Controller;

import com.example.demo.Config.BeanConfig;
import com.example.demo.DTO.Response.MyPageMaker;
import com.example.demo.DTO.Response.MyPageSupporter;
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

    /**
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/user/mypage/supporter", method = RequestMethod.GET)
    public ResponseEntity<Object> getSupporter(HttpServletRequest request){

        User user;

        //System.out.println("컨트롤러 안 : " + request.getAttribute("userNum"));
        if (request.getAttribute("userNum") == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }else {
            user = myPageService.setUserToHttpServletRequestAttribute(request);                                         // HttpServletRequest의 Attribute에서 값을 얻어서 User에 넣은 후 반환
            user = userRepo.getUserToUserId(user);                                                                      // 나머지 정보들 조회 후 반환
        }
        MyPageSupporter myPageSupporter = myPageService.setMyPageSupporter(user);

        return new ResponseEntity<>(myPageSupporter,HttpStatus.OK);
    }


    @RequestMapping(value = "user/mypage/maker", method = RequestMethod.GET)
    public ResponseEntity<Object> getMaker(HttpServletRequest request){

        User user;
        if (request.getAttribute("userNum") == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }else {
            user = myPageService.setUserToHttpServletRequestAttribute(request);                                         // HttpServletRequest의 Attribute에서 값을 얻어서 User에 넣은 후 반환
            user = userRepo.getUserToUserId(user);                                                                      // 나머지 정보들 조회 후 반환
        }

        //MyPageMaker myPageMaker = myPageService


        return new ResponseEntity<>(HttpStatus.OK);
    }


}
