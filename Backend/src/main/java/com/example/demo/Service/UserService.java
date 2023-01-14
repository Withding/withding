package com.example.demo.Service;


import com.example.demo.DTO.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
@NoArgsConstructor
@Data
public class UserService {

    /**
     * jwtService에서 HttpServletRequest에 설정한 속성들을 User 객체에 세팅해서 반환
     * @param request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @return userNum, nickName, loginTime을 세팅한 User 객체
     */
    public User setUserToHttpServletRequestAttribute(HttpServletRequest request){
        User user = new User();
        user.setUserId((Long) request.getAttribute("userNum"));
        user.setNickName((String) request.getAttribute("nickName"));
        user.setLoginTime((String) request.getAttribute("loginTime"));
        return user;
    }
}
