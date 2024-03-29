package com.example.demo.Controller.MyPageController.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@Data
public class MyPageSupporter {
    private String nickName;
    private Long fundingCount;
    private String profileImage;
    private Long point;
}
