package com.example.demo.Controller.ProjectController.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.text.SimpleDateFormat;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectSmallForm {

    private Long id;
    private String nickName;
    private String title;
    private String image;
    private Integer view;
    private Integer vote;
    private String state;
    private Boolean isDeleteAble;

    private String startEnd;
    private String deadline;
    private Long max_amount;
    private Long now_amount;
    private String completionRate;
    private String remainingTime;


    /**
     * 모든 필드를 null로 초기화 시키는 기본 생성자
     * 혹시 나중에 필드가 추가되면 추가된 필드 여기에 넣어주면 됨
     * 필요한 데이터만 전송하기 위해 @JsonInclude(JsonInclude.Include.NON_NULL)를 넣었는데 필요한 데이터만 값 넣고 필요없는 데이터는
     * 일일이 null로 초기화하기 번거로워서 처음 만들때부터 null로 세팅하고 필요한 것만 추가 세팅하기 위해 생성
     */
    public ProjectSmallForm(){
        this.id = null;
        this.nickName = null;
        this.title = null;
        this.image = null;
        this.view = null;
        this.vote = null;
        this.state = null;
        this.isDeleteAble = null;
        this.startEnd = null;
        this.deadline = null;
        this.max_amount = null;
        this.now_amount = null;
        this.completionRate = null;
        this.remainingTime = null;
    }

    public ProjectSmallForm(String user, String image, String title, String startEnd, String deadline,Long max_amount, Long now_amount, Long completionRate, String remainingTime) {
        long endTime = 0L;
        long nowTime = 0L;
        long time = 0L;

        this.nickName = user;
        this.image = image;
        this.title = title;
        this.startEnd = startEnd;
        this.deadline = deadline;
        this.max_amount = max_amount;
        this.now_amount = now_amount;
        this.completionRate = completionRate + "%";


        try {
            endTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(remainingTime).getTime();
            nowTime = System.currentTimeMillis();
            time = (endTime - nowTime);
        }
        catch (Exception e){
            e.printStackTrace();
        }

        if (time < 1000){   // 시간이 -로 표기될경우
            this.remainingTime = "종료";
        } else if (time / (1000 * 60 ) < 60) {                                          // 60분 미만
            this.remainingTime = time / (1000 * 60) + "분 남음";
        } else if (time / (1000 * 60 * 60) < 24) {                                      // 24시간 미만
            this.remainingTime = time / (1000 * 60 * 60) + "시간 남음";
        } else {                                                                        // 24시간 이상
            this.remainingTime = time / (1000 * 60 * 60 * 24 ) + "일 남음";
        }
    }




    public void setIsDeleteAble(Boolean b){
        this.isDeleteAble = b;
    }

    public Boolean getIsDeleteAble(){
        return this.isDeleteAble;
    }


}
