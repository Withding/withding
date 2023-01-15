package com.example.demo.Controller;

import com.example.demo.Config.BeanConfig;
import com.example.demo.DTO.ProfileImage;
import com.example.demo.DTO.User;
import com.example.demo.Service.FileService;
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
import java.io.File;
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


    /**
     * User 프로필 이미지 호출하는 컨트롤러
     * @param imageName 호출할 파일 이름
     * @return 호출한 이미지
     * @throws IOException
     */
    @RequestMapping(value = "/user/image/{fileName}", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> sendImage(@PathVariable("fileName") final String imageName) throws IOException
    {
        InputStream imageStream = new FileInputStream(beanConfig.PROFILE_IMAGE_PATH + imageName);
        byte[] imageByteArray = IOUtils.toByteArray(imageStream);
        imageStream.close();
        return new ResponseEntity<>(imageByteArray, HttpStatus.OK);
    }


    /**
     * 사용자의 프로필 이미지를 바꾸는 컨트롤러
     * @param image 변경할 이미지 파일
     * @param request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @return 인증실패 401, 성공 200, 정상 처리 실패 400
     */
    @RequestMapping(value = "/user/image", method = RequestMethod.PUT, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Object> changeUserImage(@RequestParam(value = "image") MultipartFile image, HttpServletRequest request)
    {
        if (request.getAttribute("userNum") == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        final String fileName = fileService.createUserImage(image);                                                     // 변경하기 위한 이미지의 이름을 수정하고 폴더에 저장하는 함수


        User user = userService.setUserToHttpServletRequestAttribute(request);                                          // request에 담긴 값으로 User 세팅
        if (fileService.changeUserImage(user, new ProfileImage(fileName, image.getOriginalFilename())) == true){        // user 테이블에서 해당 사용자의 프로필 이미지 값을 바꾸는 함수
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @RequestMapping(value = "/user/image", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteUserImage(HttpServletRequest request)
    {
        if (request.getAttribute("userNum") == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        User user = userService.setUserToHttpServletRequestAttribute(request);

        if (fileService.deleteUserImage(user.getUserId())){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }



}
