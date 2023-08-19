package com.example.demo.Entity.ArticleImage;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@NoArgsConstructor
@Data
@Entity
@Table(name = "article_image")
public class ArticleImage {
    @Id
    @Column(name = "image")
    private String image;

    @Column(name = "origin_image")
    private String originImage;
}
