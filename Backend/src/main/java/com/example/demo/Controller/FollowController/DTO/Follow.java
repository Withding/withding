package com.example.demo.Controller.FollowController.DTO;

import com.example.demo.DTO.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Data
public class Follow {
    private Long follow_id;
    private Long follower;



}
