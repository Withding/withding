package com.example.demo.Service;

import com.example.demo.Config.BeanConfig;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Data
@NoArgsConstructor
@Service
public class IntercepterService implements HandlerInterceptor {

    @Autowired
    private BeanConfig beanConfig;

    @Autowired
    private JwtService jwtService;


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        String jwt = (String) request.getAttribute("token");
        Map<String, String> claims = jwtService.getClaimsFromJwt(jwt);



        return HandlerInterceptor.super.preHandle(request, response, handler);
    }
}
