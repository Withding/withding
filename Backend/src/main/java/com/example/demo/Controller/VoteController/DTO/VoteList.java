package com.example.demo.Controller.VoteController.DTO;

import com.example.demo.DTO.Vote;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class VoteList {
    private List<Vote> votes;

}
