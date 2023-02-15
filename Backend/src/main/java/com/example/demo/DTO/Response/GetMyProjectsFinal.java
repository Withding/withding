package com.example.demo.DTO.Response;

import lombok.Data;

import java.util.List;

@Data
public class GetMyProjectsFinal {


    private Long fundingCount;
    private Long lastPage;
    private List<GetMyProjects> fundingList;
}
