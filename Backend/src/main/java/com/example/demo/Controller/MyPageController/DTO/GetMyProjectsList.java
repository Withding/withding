package com.example.demo.Controller.MyPageController.DTO;

import com.example.demo.Controller.ProjectController.DTO.GetMyProjects;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class GetMyProjectsList {
    private List<GetMyProjects> getMyProjectsList;
}
