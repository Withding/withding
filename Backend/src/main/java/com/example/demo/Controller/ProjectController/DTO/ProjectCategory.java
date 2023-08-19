package com.example.demo.Controller.ProjectController.DTO;

import com.example.demo.Entity.FundingCategory;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@NoArgsConstructor
public class ProjectCategory {
    private List<FundingCategory> categoryList;
}
