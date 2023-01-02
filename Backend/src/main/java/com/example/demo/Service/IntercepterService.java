package com.example.demo.Service;

import com.example.demo.Config.ApplicationContextConfig;
import com.example.demo.Config.BeanConfig;
import com.example.demo.Repository.UserRepo;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Service
@Data
@NoArgsConstructor
public class IntercepterService implements HandlerInterceptor {

    private JwtService jwtService = ApplicationContextConfig.getApplicationContext().getBean(JwtService.class);

    @Autowired
    private UserRepo userRepo;


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        String jwt = request.getHeader("authorization");
        System.out.println("인터셉터 안 : " + jwt);

        if (!jwtService.validateToken(jwt)){
            request.setAttribute("userNum", null);
            return true;
        }
        Map<String, Object> map = jwtService.getClaimsFromJwt(jwt);
        request.setAttribute("userNum", map.get("userNum"));
        request.setAttribute("nickName", map.get("nickName"));
        request.setAttribute("loginTime", map.get("loginTime"));
        System.out.println("preHandle 끝");

        return true;

        //return HandlerInterceptor.super.preHandle(request, response, handler);
    }
}
