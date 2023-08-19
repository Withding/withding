package com.example.demo.Controller.FileController;

import com.example.demo.Config.BeanConfig;
import com.example.demo.Controller.ProjectController.DTO.CreateContentImage;
import com.example.demo.Entity.ProfileImage;
import com.example.demo.Entity.User;
import com.example.demo.Service.FileService;
import com.example.demo.Service.ProjectService;
import com.example.demo.Service.UserService;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

@Controller
@CrossOrigin("*")
public class FileController {

    @Autowired
    private BeanConfig beanConfig;

    @Autowired
    private UserService userService;

    @Autowired
    private FileService fileService;

    @Autowired
    private ProjectService projectService;


    /**
     * 모든 이미지 호출
     * @param type 호출할 이미지 타입 (user = 유저 프로필 이미지, thumbnail = 펀딩 썸네일 이미지, article = 펀딩 물품 이미지, content = 펀딩 글 내용에 삽입된 이마지)
     * @param imageName 호출할 파일 이름
     * @return 호출 성공 = (200, 호출한 이미지 파일), 호출 실패 = 400, 인증 실패 = 401
     * @throws IOException
     */
    @RequestMapping(value = "/{type}/images/{fileName}", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> sendImage(@PathVariable("type") final String type,
                                            @PathVariable("fileName") final String imageName) throws IOException
    {

        InputStream imageStream = null;
        switch (type){
            case "user":
                // 유저 프로필 이미지는 권한 검사가 필요 없음
                imageStream = new FileInputStream(beanConfig.PROFILE_IMAGE_PATH + imageName);
                break;
            case "content":
                // 펀딩의 content 부분에 들어가는 이미지는 권한 검사를 할 수가 없음 DB에 테이블이 없이 관리
                imageStream = new FileInputStream(beanConfig.CONTENT_IMAGE_PATH + imageName);
                break;
            case "thumbnail":
                //if (imageName.equals("default.jpeg") || fileService.isVisibleImage(user.getUserId(), imageName, type)) {
                    imageStream = new FileInputStream(beanConfig.THUMBNAIL_IMAGE_PATH + imageName);
                //}
                break;
            case "article":
                //if (imageName.equals("default.png") || fileService.isVisibleImage(user.getUserId(), imageName, type)){
                    imageStream = new FileInputStream(beanConfig.ARTICLE_IMAGE_PATH + imageName);
                //}
                break;
            default:
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        byte[] imageByteArray = IOUtils.toByteArray(imageStream);
        imageStream.close();
        return new ResponseEntity<>(imageByteArray, HttpStatus.OK);
    }


    /**
     * 펀딩 글 내용에 삽입되는 이미지 파일을 저장하는 컨트롤러
     * @param imageFile 삽입된 이미지 파일
     * @param request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @return
     */
    @RequestMapping(value = "/content/image", method = RequestMethod.PUT, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Object> createContentImage(@RequestParam(value = "image") MultipartFile imageFile, HttpServletRequest request){
        System.out.println(request.getAttribute("userNum"));
        // ------------------------------ 인증 --------------------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        if (user == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String imageFileName = dateFormat.format(
                new Timestamp(System.currentTimeMillis()))
                + "_"
                + imageFile.getOriginalFilename().replaceAll(" ", "");

        if (projectService.createContentImage(imageFile, imageFileName)){
            return new ResponseEntity<>(
                    CreateContentImage.builder().preview(beanConfig.SERVER_URL + ":" + beanConfig.SERVER_PORT + beanConfig.CONTENT_IMAGE_URL + imageFileName).build(),
                    HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    /**
     * 유저의 프로필 이미지를 특정 이미지로 변경
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
     * 유저의 프로필 이미지를 기본 이미지로 변경
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
}
