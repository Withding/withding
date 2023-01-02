package com.example.demo.DTO.CompoSitekey;

import lombok.Data;

import java.io.Serializable;


@Data
public class VotePK implements Serializable {
    private Long user_id;
    private Long funding_id;
}
