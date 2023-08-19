package com.example.demo.Controller.ProjectController.DTO;

import com.example.demo.Entity.Article;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class GetProject_3Level {

    /**
     * List<Article> 타입의 변수를 넘겨주면 해당 변수의 내용을 List<Product> 타입으로 변환
     * @param articles List<Article> 타입의 변수
     */
    public GetProject_3Level(List<Article> articles){
        this.articles = new ArrayList<>();

        for (int i = 0; i < articles.size(); i++){
            Product product = new Product();
            product.setId(articles.get(i).getId());
            //product.setImage(articles.get(i).getArticleImage());
            product.setName(articles.get(i).getName());
            product.setDescription(articles.get(i).getDescription());
            product.setPrice(articles.get(i).getPrice());
            product.setShippingPrice(articles.get(i).getShippingPrice());
            product.setShippingDay(articles.get(i).getShippingDay().substring(0,10));
            product.setInventory(articles.get(i).getInventory());
            this.articles.add(product);
        }
    }

    private List<Product> articles;
}
