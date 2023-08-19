package com.example.demo.Controller.PointController;

import com.example.demo.Entity.User;
import com.example.demo.Service.PointService;
import com.example.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
     *
     * @param request request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @param point 지급할 포인트
     * @return 정상 = 204, 실패 = 400, 인증실패 = 401
     */
    @PostMapping(value = "/users/{userId}/point/{point}")
    public ResponseEntity<Object> chargePoint(HttpServletRequest request,
                                              @PathVariable("userId") Long userId,
                                              @PathVariable("point") Long point) {
        // ------------------------------ 인증(이 부분 바꿔야됨 일반 유저가 아닌 관리자의 토큰이 필요) --------------------------------------------------------------------------
        User admin = userService.setUserToHttpServletRequestAttribute(request);
        if (admin == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------
        if (pointService.chargePoint(userId, point, "회원가입 이벤트")){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


}
