package com.example.demo.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.Date;
import java.util.regex.Pattern;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@Entity
@Table(name = "user")                 // 회원
@DynamicInsert                        // insert 시점에 테이블에 설정한 default 값으로 초기화 하도록 해주는 어노테이션
public class User {

    @Transient
    private String accessToken;       // 카카오 로그인 API에 사용

    @Transient
    private String authCode;               // 인증코드

    @Transient
    private Date loginTime;             // 로그인 시간


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;                // user 인덱스
    private String email;               // 이메일

    @ManyToOne
    @JoinColumn(name = "id_type_code")
    private IdType idType;                 // 카카오, 네이버, 구글 구분

    private String pwd;                 // 비밀번호

    @Column(name = "user")
    private String nickName;                // 닉네임

    @Column(name = "profile_image")
    private String profileImage;        // 프로필 이미지

    @Column(name = "created_at")
    private String createdAt;             // 가입시간

    @Column(name = "logout_at")
    private Date logoutAt;              // 로그아웃 시간

    private Long point;                 // 보유 포인트

    @Column(name = "funding_list")
    private String fundingList;         // 내가 펀딩한 목록

    @Column(name = "vote_list")
    private String voteList;            // 내가 좋아요 누른 목록

    @ManyToOne
    @JoinColumn(name = "state_code")
    private State state;                // 회원 상태


    /**
     * 이메일 유효성 검사
     * @return 사용 가능시 true
     */
    public boolean isEmail()
    {
        if (this.email == null)
            return false;

        String str3 = "^[a-zA-Z0-9+-\\_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$"; // 이메일 (2~20자)
        if (10 <= this.email.length() && this.email.length() <= 20) {
            return Pattern.matches(str3, this.email);
        }
        else {
            return false;
        }
    }


    /**
     * 닉네임(name) 유효성 검사
     * @return 사용 가능시 true
     */
    public boolean isNickName()
    {
        if (this.nickName == null) {
            return false;
        }
        String str4 = "^[a-zA-Z가-힣]{1}[a-zA-Z0-9가-힣]{2,10}$"; // 닉네임 검증식 (2~10자)

        if (2 <= this.nickName.length() && this.nickName.length() <= 10)
        {
            return Pattern.matches(str4, this.nickName);
        }
        else
            return false;
    }


    /**
     * 비밀번호 유효성 검사
     * @return 사용 가능시 true
     */
    public boolean isPwd()
    {
        if (this.pwd == null)
            return false;
        String str2 = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W).{8,25}$"; // 비밀번호(8~25자)
        boolean res2 = Pattern.matches(str2, this.pwd);
        return res2;
    }

}
