package com.example.demo.Controller.UserController.DTO;

import com.example.demo.DTO.Funding;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Data
public class UserInfo {
    private String nickname;
    private String userImage;
    private Long fundingCount;
    private Long followerCount;
    private Long followingCount;
    private boolean isFollowing;


    public void setIsFollowing(boolean state){
        this.isFollowing = state;
    }
    public boolean getIsFollowing(){
        return this.isFollowing;
    }
}
