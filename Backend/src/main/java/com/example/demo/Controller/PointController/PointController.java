package com.example.demo.Controller.PointController;

import com.example.demo.DTO.User;
import com.example.demo.Service.PointService;
import com.example.demo.Service.ProjectService;
import com.example.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;

@Controller
@CrossOrigin("*")
public class PointController {

    @Autowired
    private PointService pointService;

    @Autowired
    private UserService userService;

    /**
     * 이벤트로 포인트 지급
     * @param point 지급할 포인트
     * @param request request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @return
     */
    @RequestMapping(value = "/point", method = RequestMethod.POST)
    public ResponseEntity<Object> chargePoint(@RequestParam Long point,
                                              HttpServletRequest request) {
        // ------------------------------ 인증 --------------------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------
        if (pointService.chargePoint(user, point, "회원가입 이벤트")){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


}
