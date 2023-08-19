package com.example.demo.Controller.FollowController.DTO;

import com.example.demo.Entity.Follow;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class FollowList {
    private List<Follow> list;
}
