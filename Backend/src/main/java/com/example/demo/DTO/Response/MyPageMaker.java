package com.example.demo.DTO.Response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class MyPageMaker {
    private int fundingCount;
    private int followCount;
    private int loginType;
}
