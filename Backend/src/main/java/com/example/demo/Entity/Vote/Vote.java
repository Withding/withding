package com.example.demo.Entity.Vote;

import com.example.demo.Entity.CompoSitekey.VotePK;
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
