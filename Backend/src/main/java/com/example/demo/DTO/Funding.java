package com.example.demo.DTO;


import com.example.demo.Config.BeanConfig;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import java.text.SimpleDateFormat;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@DynamicInsert
@Entity
@Table(name = "funding")                    // 펀딩
@org.hibernate.annotations.NamedQueries({

})
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
    @NotFound(action = NotFoundAction.IGNORE)
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
    private String startEnd;                // 시작시간

    private String deadLine;                // 마감기간

    @ManyToOne
    @JoinColumn(name = "funding_category_id")
    private FundingCategory fundingCategory;  // 펀딩 카테고리

    @ManyToOne
    @JoinColumn(name = "state_code")
    private FundingStateCode fundingStateCode;  // 글 상태

    @Transient
    private String imageUrl;            // 썸네일 이미지 호출 url

    @Transient
    private String completionRate;      // 완료율

    @Transient
    private String remainingTime;       // 남은 기간


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


    public Funding(Long userId, String fundingState){
        this.userId.setUserId(userId);
        this.fundingStateCode.setState(fundingState);
    }

    public Funding(String user, String image, String title, String startEnd, String deadline,Long max_amount, Long now_amount, Long completionRate, String remainingTime) {
        long endTime = 0L;
        long nowTime = 0L;
        long time = 0L;
        this.userId = new User();
        this.thumbnail = new Thumbnail();


        this.userId.setNickName(user);
        this.thumbnail.setImage(image);
        this.title = title;
        this.startEnd = startEnd;
        this.deadLine = deadline;
        this.maxAmount = max_amount;
        this.nowAmount = now_amount;
        this.completionRate = completionRate + "%";


        try {
            endTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(remainingTime).getTime();
            nowTime = System.currentTimeMillis();
            time = (endTime - nowTime);
        }
        catch (Exception e){
            e.printStackTrace();
        }

        if (time < 1000){   // 시간이 -로 표기될경우
            this.remainingTime = "종료";
        } else if (time / (1000 * 60 ) < 60) {                                          // 60분 미만
            this.remainingTime = time / (1000 * 60) + "분 남음";
        } else if (time / (1000 * 60 * 60) < 24) {                                      // 24시간 미만
            this.remainingTime = time / (1000 * 60 * 60) + "시간 남음";
        } else {                                                                        // 24시간 이상
            this.remainingTime = time / (1000 * 60 * 60 * 24 ) + "일 남음";
        }
    }


}
