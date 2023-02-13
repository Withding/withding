package com.example.demo.Controller;

import com.example.demo.DTO.Response.GetMyProjects;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class GetMyProjectsList {
    private List<GetMyProjects> getMyProjectsList;
}
