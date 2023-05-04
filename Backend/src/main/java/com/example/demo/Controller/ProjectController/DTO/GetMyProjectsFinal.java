package com.example.demo.Controller.ProjectController.DTO;

import lombok.Data;

import java.util.List;

@Data
public class GetMyProjectsFinal {


    private Long fundingCount;
    private Long lastPage;
    private List<GetMyProjects> fundingList;
}
