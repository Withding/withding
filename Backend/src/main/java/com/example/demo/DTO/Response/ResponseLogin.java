package com.example.demo.DTO.Response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseLogin {
    private String accessToken;
    private String nickName;
}
