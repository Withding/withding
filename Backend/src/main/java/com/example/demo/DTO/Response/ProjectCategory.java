package com.example.demo.DTO.Response;

import com.example.demo.DTO.FundingCategory;
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
