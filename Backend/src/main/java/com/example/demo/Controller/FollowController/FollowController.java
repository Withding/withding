package com.example.demo.Controller.FollowController;

import com.example.demo.Entity.User.User;
import com.example.demo.Service.FollowService;
import com.example.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Controller
@CrossOrigin("*")
public class FollowController {

    @Autowired
    private UserService userService;

    @Autowired
    private FollowService followService;


    /**
     * 나의 팔로워 목록 호출(나를 팔로우한 사람들 목록 호출)
     *
     * @param request request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @return 정상 = 200, 인증실패 = 401
     */
    @GetMapping("/my/follows")
    public ResponseEntity<Object> getMyFollow(HttpServletRequest request)
    {
        // ------------------------------ 인증 --------------------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        if (user == null){                                                                                              // 인증
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------
        return new ResponseEntity<>(followService.getFollowList(null, user), HttpStatus.OK);
    }

    /**
     *
     * @param userId
     * @param request
     * @return
     */
    @GetMapping("/users/{userId}/followers")
    public ResponseEntity<Object> getFollowers(@PathVariable("userId") final Long userId,
                                               final HttpServletRequest request){
        // ------------------------------ 인증 --------------------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        if (user == null){                                                                                              // 인증
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------
        User target = userService.getUserToUserId(userId);
        return new ResponseEntity<>(followService.getFollowerList(user, target), HttpStatus.OK);
    }


    /**
     * 특정 사용자의 팔로우 목록 호출
     *
     * @param request request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @param userId 팔로우 목록을 호출할 사용자의 userId
     * @return 정상 = 200, 인증실패 = 401
     */
    @GetMapping("/users/{userId}/follows")
    public ResponseEntity<Object> getFollows(HttpServletRequest request,
                                            @PathVariable("userId") Long userId) {
        // ------------------------------ 인증 --------------------------------------------------------------------------
        User me = userService.setUserToHttpServletRequestAttribute(request);                                            // 인증
        User target = userService.getUserToUserId(userId);
        // -------------------------------------------------------------------------------------------------------------

        return new ResponseEntity<>(followService.getFollowList(me, target), HttpStatus.OK);
    }


    /**
     * 특정 유저를 팔로우하기
     *
     * @param request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @return 정상 = 204, 비정상 = 400, 인증 실패 = 401
     */
    @PostMapping("/users/{userId}/follow")
    public ResponseEntity<Object> follow(HttpServletRequest request,
                                 @PathVariable("userId") Long userId){
        // ------------------------------ 인증 --------------------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        if (user == null){                                                                                              // 인증
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------

        if ((user.getUserId() != userId) && followService.follow(user, userId)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    /**
     * 특정 유저와 팔로우 해제
     *
     * @param request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @return 정상 = 204, 비정상 = 400, 인증실패 = 401
     */
    @DeleteMapping("/users/{userId}/follow")
    public ResponseEntity<Object> unFollow(HttpServletRequest request,
                                   @PathVariable("userId")Long unfollowNum){
        // ------------------------------ 인증 --------------------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        if (user == null){                                                                                              // 인증
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------

        if (followService.unFollow(user, unfollowNum)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}