package com.example.demo.Controller.MyPageController;

import com.example.demo.Config.BeanConfig;
import com.example.demo.Controller.MyPageController.DTO.MyPageMaker;
import com.example.demo.Controller.MyPageController.DTO.MyPageSupporter;
import com.example.demo.DTO.User;
import com.example.demo.Repository.UserRepo;
import com.example.demo.Service.MyPageService;
import com.example.demo.Service.ProjectService;
import com.example.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

@Controller
@CrossOrigin("*")
public class MyPageController {

    @Autowired
    private UserService userService;

    @Autowired
    private MyPageService myPageService;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private BeanConfig beanConfig;

    @Autowired
    private ProjectService projectService;

    /**
     * 마이페이지 서포터
     * @param request
     * @return
     */
    @RequestMapping(value = "/my/supporter", method = RequestMethod.GET)
    public ResponseEntity<Object> getSupporter(HttpServletRequest request)
    {

        // ------------------------------ 인증 --------------------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        if (user == null){                                                                                              // 인증
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------
        else {
            user = userService.setUserToHttpServletRequestAttribute(request);                                           // HttpServletRequest의 Attribute에서 값을 얻어서 User에 넣은 후 반환
            user = userRepo.getUserToUserId(user);                                                                      // 나머지 정보들 조회 후 반환
        }
        MyPageSupporter myPageSupporter = myPageService.setMyPageSupporter(user);

        return new ResponseEntity<>(myPageSupporter,HttpStatus.OK);
    }

    /**
     * 마이페이지 메이커
     * @param request
     * @return
     */
    @RequestMapping(value = "/my/maker", method = RequestMethod.GET)
    public ResponseEntity<Object> getMaker(HttpServletRequest request)
    {

        // ------------------------------ 인증 --------------------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        if (user == null){                             // 인증 || 기존에 글을 작성하던 작성자인지 확인 해당 함수
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------
        else {
            user = userService.setUserToHttpServletRequestAttribute(request);                                           // HttpServletRequest의 Attribute에서 값을 얻어서 User에 넣은 후 반환
            user = userRepo.getUserToUserId(user);                                                                      // 나머지 정보들 조회 후 반환
        }
        MyPageMaker myPageMaker = myPageService.setMyPageMaker(user);
        return new ResponseEntity<>(myPageMaker, HttpStatus.OK);
    }





}
