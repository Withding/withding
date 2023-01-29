package com.example.demo.DTO.Response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetProject_1Level {
    private String title;                   // 제목
    private String category;                // 카테고라
    private Long targetAmount;              // 목표 금액
    private String startDate;               // 시작일
    private String endDate;                 // 마감일
    private String preViewImage;            // 썸네일 호출 API

    private Long userId;                    // 작성자 Id
}
