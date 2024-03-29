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
     * 사용자의 프로필 이미지를 바꾸는 컨트롤러
     * @param image 변경할 이미지 파일
     * @param request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @return 인증실패 401, 성공 204, 정상 처리 실패 400
     */
    @RequestMapping(value = "/user/image", method = RequestMethod.PUT, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Object> changeUserImage(@RequestParam(value = "image") MultipartFile image, HttpServletRequest request)
    {
        // ------------------------------ 인증 --------------------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        if (user == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        final String imageName = dateFormat.format(new Timestamp(System.currentTimeMillis()))                           // 현재 시간을 2023-01-14_21:22:23 등과 같이 표현
                + "_"                                                                                                   // 구분자
                + image.getOriginalFilename().replaceAll(" ", "");                                     // 파일 이름에 공백이 들어있을 수 있으므로 공백 제거

        if (userService.changeUserImage(user, image, imageName)){
            ProfileImage profileImage = new ProfileImage();
            profileImage.setProfileImage(beanConfig.SERVER_URL + ":" + beanConfig.SERVER_PORT + beanConfig.PROFILE_IMAGE_URL + imageName);
            profileImage.setOriginProfileImage(null);
            return new ResponseEntity<>(
                    profileImage,
                    HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    /**
     * 사용자 프로필 이미지를 기본 이미지로 변경하는 컨트롤러
     * @param request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @return 인증실패 401, 성공 204, 정상 처리 실패 400
     */
    @RequestMapping(value = "/user/image", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteUserImage(HttpServletRequest request)
    {
        // ------------------------------ 인증 --------------------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        if (user == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------

        if (userService.deleteUserImage(user.getUserId())) {
            ProfileImage profileImage = new ProfileImage();
            profileImage.setProfileImage(beanConfig.SERVER_URL + ":" + beanConfig.SERVER_PORT + beanConfig.PROFILE_IMAGE_URL + beanConfig.DEFAULT_USER_IMAGE);
            profileImage.setOriginProfileImage(null);
            return new ResponseEntity<>(profileImage, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }


    /**
     * 특정 유저 정보 호출.md
     *
     * @param request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @param userId 정보를 호출할 유저의 userId
     * @return 인증 실패 401, 호출 성공 200
     */
    @GetMapping(value = "/user")
    public ResponseEntity<Object> getUserInfo(HttpServletRequest request,
                                              @RequestParam("userId") Long userId) {
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
