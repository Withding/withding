package com.example.demo.DTO.CompoSitekey;

import lombok.Data;

import javax.persistence.Column;
import java.io.Serializable;


@Data
public class VotePK implements Serializable {
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "funding_id")
    private Long fundingId;
}
