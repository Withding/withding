package com.example.demo.Entity.FundingDetails;

import com.example.demo.Entity.Funding.Funding;
import com.example.demo.Entity.User.User;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@Entity
@Table(name = "funding_details")           // 펀딩 내역
public class FundingDetails {

    @Id
    @Column(name = "funding_details_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                       // 펀딩 내역 번호

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;                   // 유저 번호

    @ManyToOne
    @JoinColumn(name = "funding_id")
    private Funding funding;                // 펀딩 번호

    private Long amount;                   // 펀딩 금액

    @Column(name = "funding_at")
    private Date fundingAt;                // 펀딩한 시간
}
