package com.example.demo.DTO.Response;

import com.example.demo.DTO.Follower;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class GetFollowList {
    private List<Follower> follows;
}
