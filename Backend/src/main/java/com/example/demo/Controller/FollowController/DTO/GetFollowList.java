package com.example.demo.Controller.FollowController.DTO;

import com.example.demo.DTO.Follower;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class GetFollowList {
    private List<Follower> follows;
}