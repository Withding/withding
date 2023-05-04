package com.example.demo.Controller.LoginController.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@AllArgsConstructor
public class Login {
    private String accessToken;
    private String nickName;
    private String image;
}
