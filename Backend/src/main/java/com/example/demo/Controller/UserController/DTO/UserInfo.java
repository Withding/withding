package com.example.demo.Controller.UserController.DTO;

import com.example.demo.DTO.Funding;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Data
public class UserInfo {
    private List<Funding> fundingList;
    private Long followerCount;
    private Long followingCount;
}
