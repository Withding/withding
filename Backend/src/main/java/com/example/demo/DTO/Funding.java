package com.example.demo.DTO;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@DynamicInsert
@Entity
@Table(name = "funding")                    // 펀딩
public class Funding {

    @Id
    @Column(name = "funding_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                        // 펀딩 번호

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User userId;                    // 작성자

    private String title;                   // 제목

    @ManyToOne
    // cascade = CascadeType.PERSIST = Funding 영속성 추가할때 이 어노테이션이 달린 객체도 같이 영속성에 추가하는 것
    @JoinColumn(name = "image")
    private Thumbnail thumbnail;

    private String content;                 // 내용

    @Column(name = "max_amount")
    private Long maxAmount;                 // 목표금액

    @Column(name = "now_amount")
    private Long nowAmount;                 // 현재 금액

    @Column(name = "view_count")
    private int view;                       // 조회수

    @Column(name = "vote_count")
    private int vote;                       // 좋아요 숫자

    @Column(name = "created_at")
    private String createdAt;               // 작성시간

    @Column(name = "open_at")
    private String startEnd;                  // 시작시간

    private String deadLine;                // 마감기간

    @ManyToOne
    @JoinColumn(name = "funding_category_id")
    private FundingCategory fundingCategory;  // 펀딩 카테고리


    //@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    //@PrimaryKeyJoinColumn(name = "article_id")
    //private Article article_1;


    @ManyToOne
    @JoinColumn(name = "state_code")
    private FundingStateCode fundingStateCode;  // 글 상태

    /**
     * 특정 사용자 정보 호출에서 사용
     *
     * @param id 특정 사용자가 작성한 펀딩 글
     * @param title 특정 사용자가 작서한 펀딩 글의 제목
     * @param thumbnail 특정 사용자가 작서한 펀딩 글의 썸네일
     * @param fundingStateCode 특정 사용자가 작서한 펀딩 글의 상태
     */
    public Funding(Long id, String title, Thumbnail thumbnail, FundingStateCode fundingStateCode) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.fundingStateCode = fundingStateCode;
    }

}
