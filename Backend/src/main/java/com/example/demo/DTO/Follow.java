package com.example.demo.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@Data
@Entity
@Table(name = "follow")
public class Follow {

    public Follow(User user, Long targetId) {
        this.user = user;
        this.follower = targetId;
    }
    public Follow(Long follow_id, Long follower){
        this.follow_id = follow_id;
        this.follower = follower;
    }


    @Id
    @Column(name = "follow_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long follow_id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Long follower;


}
