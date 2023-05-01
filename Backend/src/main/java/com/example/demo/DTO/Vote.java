package com.example.demo.DTO;

import com.example.demo.DTO.CompoSitekey.VotePK;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@IdClass(VotePK.class)
public class Vote {
    @Id
    private Long userId;
    @Id
    private Long fundingId;

}
