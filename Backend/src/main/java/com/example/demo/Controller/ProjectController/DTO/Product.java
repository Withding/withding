package com.example.demo.Controller.ProjectController.DTO;

import com.example.demo.DTO.ArticleImage;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Product {
    private Long id;
    //private String preview;
    private String name;
    private String description;
    private Integer price;
    private Integer shippingPrice;
    private String shippingDay;
    private Integer inventory;
}
