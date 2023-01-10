package com.example.demo.DTO;

import com.example.demo.DTO.CompoSitekey.VotePK;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@NoArgsConstructor
@Data
@Entity
@IdClass(VotePK.class)
public class Vote {
    @Id
    private Long user_id;
    @Id
    private Long funding_id;
}
