package com.example.demo.Controller.UserController;

import com.example.demo.Config.BeanConfig;
import com.example.demo.Controller.UserController.DTO.UserInfo;
import com.example.demo.DTO.ProfileImage;
import com.example.demo.DTO.User;
import com.example.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

@CrossOrigin("*")
@Controller
public class UserController {

    @Autowired
    private BeanConfig beanConfig;

    @Autowired
    private UserService userService;








    /**
     * 특정 유저 정보 호출.md
     *
     * @param request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @param userId 정보를 호출할 유저의 userId
     * @return 인증 실패 401, 호출 성공 200
     */
    @GetMapping(value = "/users/{userId}")
    public ResponseEntity<Object> getUserInfo(HttpServletRequest request,
                                              @PathVariable("userId") Long userId) {
        // ------------------------------ 인증 --------------------------------------------------------------------------
        // 헤더에 jwt가 없어도 정상동작 해야됨(있으면 팔로잉 상태 true, 없으면 false)
        User user = userService.setUserToHttpServletRequestAttribute(request);
        if (user == null){
            user = new User();
        }

        // -------------------------------------------------------------------------------------------------------------

        User findUser = userService.getUserToUserId(userId);
        if (findUser == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        UserInfo userInfo = userService.getUserInfo(user, findUser);
        return new ResponseEntity<>(userInfo, HttpStatus.OK);
    }





}
