package com.example.demo.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@Entity
@Table(name = "funding_category")           // 펀딩 카테고리
public class FundingCategory {

    public FundingCategory(Long id){
        this.id = id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "funding_category_id")
    private Long id;                     // 펀딩 카테로리 번호

    private String category;                // 카테고리 종류
}
