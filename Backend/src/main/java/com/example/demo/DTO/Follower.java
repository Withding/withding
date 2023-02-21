package com.example.demo.DTO;

import lombok.Data;
import org.springframework.stereotype.Repository;
import javax.persistence.*;

@Repository
@Data
@Entity
@Table(name = "follow")
public class Follower {

    @Id
    @Column(name = "follow_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long follow_id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Long follower;


}
