package com.example.demo.Controller;

import com.example.demo.Config.BeanConfig;
import com.example.demo.DTO.ProfileImage;
import com.example.demo.DTO.User;
import com.example.demo.Service.FileService;
import com.example.demo.Service.UserService;
import org.apache.commons.io.IOUtils;
import org.jsoup.Jsoup;
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




    /**
     * 모든 이미지를 담당하는 컨트롤러
     * @param type 호출할 이미지 타입 (UserProfile, thumbnail, 등등)
     * @param imageName 호출할 파일 이름
     * @return 호출한 이미지
     * @throws IOException
     */
    @RequestMapping(value = "/{type}/image/{fileName}", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> sendImage(
            @PathVariable("type") final String type,
            @PathVariable("fileName") final String imageName) throws IOException
    {
        InputStream imageStream;
        switch (type){
            case "user":
                imageStream = new FileInputStream(beanConfig.PROFILE_IMAGE_PATH + imageName);
                break;
            case "thumbnail":
                imageStream = new FileInputStream(beanConfig.THUMBNAIL_IMAGE_PATH + imageName);
                break;
            case "content":
                imageStream = new FileInputStream(beanConfig.CONTENT_IMAGE_PATH + imageName);
                break;
            case "article":
                imageStream = new FileInputStream(beanConfig.ARTICLE_IMAGE_PATH + imageName);
                break;
            default:
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        byte[] imageByteArray = IOUtils.toByteArray(imageStream);
        imageStream.close();
        return new ResponseEntity<>(imageByteArray, HttpStatus.OK);
    }





}
