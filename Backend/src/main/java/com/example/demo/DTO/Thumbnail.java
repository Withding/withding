package com.example.demo.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "thumbnail")
public class Thumbnail {

    @Id
    @Column(name = "image")
    private String image;

    @Column(name = "origin_image")
    private String origin_image;
}
