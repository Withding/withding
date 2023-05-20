package com.example.demo.Controller.ProjectController.DTO;

import com.example.demo.DTO.Funding;
import lombok.Data;

import java.util.List;

@Data
public class GetFundingListToUserNum {

    private List<Funding> fundingList;
}
