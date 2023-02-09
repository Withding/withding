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

    @ManyToOne(fetch = FetchType.LAZY)
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
     * 펀딩 최종 유효성 검사 함수
     *
     * @return 1단계 유효성 검사 오류 = "1", 2단계 유효성 검사 오류 = "2", 통과 = "0"
     */
    public String fundingValidate() {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date startDate;
        Date endDate;
        try {
            startDate = dateFormat.parse(this.startEnd);
            endDate = dateFormat.parse(this.deadLine);
        } catch (Exception e) {
            e.printStackTrace();
            return "1";
        }

        // 1단계 유효성 검사
        if
        (
                (this.title == null || 0 >= this.title.length() || this.title.length() >= 41) ||                        // 제목이 null 이거나 제목길이가 0 이거나 제목 길이가 40자를 초과
                        (this.thumbnail == null || this.thumbnail.getImage().length() <= 43) ||                                 // 썸네일이 null 이거나 썸네일 호출 url이 이상한경우
                        (this.getMaxAmount() == null || 1000 > this.getMaxAmount() || this.getMaxAmount() >= 1000000000) ||     // 목표금액이 null 이거나 목표 금액이 1000원 미만 이거나 10억 초과인 경우
                        (this.startEnd == null || this.deadLine == null || endDate.after(startDate) == false)                   // 시작 날짜가 null 이거나 종료 날짜가 null이거나 종료날짜가 시작날짜 보다 앞에 있는 경우
        ) {
            return "1";
        }

        // 2단계 유효성 검사
        else if (this.content == null || this.content.length() > 1000) {                                              // 설명이 null 이거나 1000자를 초과한 경우){
            return "2";
        }

        // 통과
        else {
            return "0";
        }
    }
}
