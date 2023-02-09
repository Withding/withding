package com.example.demo.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@NoArgsConstructor
@Data
@DynamicInsert
@Entity
@Table(name = "article")
public class Article {

    @Id
    @Column(name = "article_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                            // 물품 번호

    @ManyToOne
    @JoinColumn(name = "image")
    private ArticleImage articleImage;          // 이미지

    @Column(name = "article_name")
    private String name;                        // 상품 이름

    @Column(name = "comment")
    private String description;                 // 상품 설명

    @Column(name = "price")
    private Integer price;                      // 가격

    @Column(name = "shipping")
    private Integer shippingPrice;              // 배송비

    @Column(name = "start_send")
    private String shippingDay;                 // 배송 시작일

    @Column(name = "inventory")
    private Integer inventory;                  // 재고

    @ManyToOne
    @JoinColumn(name = "funding_id")
    private Funding fundingId;                  // 프로젝트 번호

}
