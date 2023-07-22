package com.example.demo.Service;

import com.example.demo.Config.ApplicationContextConfig;
import com.example.demo.Config.BeanConfig;
import com.example.demo.Repository.UserRepo;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Synchronized;
import net.bytebuddy.implementation.bytecode.Throw;
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
        // System.out.println("인터셉터 접근 성공, JWT : " + jwt);

        Map<String, Object> map = jwtService.validateToken(jwt);
        if (map == null){
            request.setAttribute("userNum", null);
            return true;
        }
        // System.out.println("map = " + map);
        request.setAttribute("userNum", map.get("userNum"));
        request.setAttribute("nickName", map.get("nickName"));
        request.setAttribute("loginTime", map.get("loginTime"));
        // System.out.println("Request 세팅 완료");

        return true;

        //return HandlerInterceptor.super.preHandle(request, response, handler);
    }
}
