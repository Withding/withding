package com.example.demo.DTO.Response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@Data
public class MyPageSupporter {
    private String nickName;
    private Long voteCount;
    private Long fundingCount;
    private String profileImage;
    private Long point;
}
