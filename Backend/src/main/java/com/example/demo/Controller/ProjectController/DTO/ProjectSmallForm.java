package com.example.demo.Controller.ProjectController.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.springframework.lang.Nullable;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectSmallForm {
    private Long id;
    private String title;
    private String image;
    private Integer view;
    private Integer vote;
    private String state;
    private Boolean isDeleteAble;

    /**
     * 모든 필드를 null로 초기화 시키는 기본 생성자
     * 혹시 나중에 필드가 추가되면 추가된 필드 여기에 넣어주면 됨
     * 필요한 데이터만 전송하기 위해 @JsonInclude(JsonInclude.Include.NON_NULL)를 넣었는데 필요한 데이터만 값 넣고 필요없는 데이터는
     * 일일이 null로 초기화하기 번거로워서 처음 만들때부터 null로 세팅하고 필요한 것만 추가 세팅하기 위해 생성
     */
    public ProjectSmallForm(){
        this.id = null;
        this.title = null;
        this.image = null;
        this.view = null;
        this.vote = null;
        this.state = null;
        this.isDeleteAble = null;
    }


    public void setIsDeleteAble(Boolean b){
        this.isDeleteAble = b;
    }

    public Boolean getIsDeleteAble(){
        return this.isDeleteAble;
    }
}
