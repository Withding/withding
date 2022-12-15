package com.example.demo.DTO;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@Entity
@Table(name = "funding")                    // 펀딩
public class Funding {

    @Id
    @Column(name = "funding_id")
    private Long id;                        // 펀딩 번호

    private String title;                   // 제목
    private String content;                 // 내용

    @Column(name = "max_amount")
    private Long maxAmount;                 // 목표금액

    @Column(name = "now_amount")
    private Long nowAmount;                 // 현재 금액

    private String deadline;                // 마감기간

    @Column(name = "view_count")
    private int view;                       // 조회수

    @Column(name = "vote_count")
    private int vote;                       // 좋아요 숫자

    @Column(name = "created_at")
    private String createdAt;               // 작성시간

    @Column(name = "open_at")
    private String openAt;                  // 시작시간

    @ManyToOne
    @JoinColumn(name = "funding_category_id")
    private FundingCategory fundingCategory;

}
