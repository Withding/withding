package com.example.demo.DTO.Response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GetMyProjects {

    private Long id;
    private String image;
    private String title;
    private String state;
}
