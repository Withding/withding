package com.example.demo.DTO.Request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SignUpRequest {

    private String email;
    private String password;
    private String nickName;
    private String authCode;
    private String secretKey;
}
