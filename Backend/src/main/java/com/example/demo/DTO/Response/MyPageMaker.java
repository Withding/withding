package com.example.demo.DTO.Response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class MyPageMaker {
    private Long fundingCount;
    private Long followCount;
}