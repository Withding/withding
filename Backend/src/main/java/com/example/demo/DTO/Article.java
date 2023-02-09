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


    public boolean articleValidate(){
        if (    (this.getName() == null || this.getName().equals("")) ||                                                // 물품 이름이 null 이거나 값이 없으면 안 됨
                (this.getDescription() == null || this.getDescription().equals("")) ||                                  // 물품 설명이 null 이거나 값이 없으면 안 됨
                (this.getShippingDay() == null || this.getShippingDay().equals("")) ||                                  // 물품 발송일이 null 이거나 값이 없으면 안 됨
                (this.getPrice() == null || this.getPrice() < 1000) ||                                                  // 물품 가격이 null 이거나 1000원 미만이면 안 됨
                (this.getShippingPrice() == null || 0 > this.getShippingPrice()) ||                                     // 물품 배송 가격이 null 이거나 음수면 안 됨
                (this.getInventory() == null) || 0 >= this.getInventory()   )                                           // 물품 재고량이 null 이거나 0개 이하면 안 됨
        {
            return false;
        } else {
            return true;
        }

    }
}
