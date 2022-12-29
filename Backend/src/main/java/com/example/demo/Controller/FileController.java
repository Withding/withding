package com.example.demo.Controller;

import com.example.demo.Config.BeanConfig;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@Controller
@CrossOrigin("*")
public class FileController {

    @Autowired
    private BeanConfig beanConfig;

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
}
