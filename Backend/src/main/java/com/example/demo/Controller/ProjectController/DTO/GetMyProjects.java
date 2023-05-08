package com.example.demo.Controller.ProjectController.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GetMyProjects {

    private Long id;
    private String image;
    private String title;
    private String state;
    private boolean isDeleteAble;


    public void setIsDeleteAble(boolean b){
        this.isDeleteAble = b;
    }

    public Boolean getIsDeleteAble(){
        return this.isDeleteAble;
    }
}
