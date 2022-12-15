package com.example.demo.Service;

import com.example.demo.Config.BeanConfig;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Data
@NoArgsConstructor
@Service
public class IntercepterService {

    @Autowired
    private BeanConfig beanConfig;

    @Autowired
    private JwtService jwtService;




}
