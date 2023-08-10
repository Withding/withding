package com.example.demo.DTO;

import com.example.demo.Enum.FollowEnum;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import java.util.List;

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
    public Follow(final Long userId, final Long follower){
        this.userId = userId;
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

    @Transient
    private boolean relation;

    @Transient
    private Long userId;

    @Transient
    private String name;



    /**
     * 상대와 내가 관계가 있는지 확인하는 함수(서로 follow, follower 관계인지 확인)
     * @param myFollowList 나와 관련된 follow 목록
     */

    public void isFollowRelationToMe(final List<Follow> myFollowList, final FollowEnum followEnum) {
        this.name = user.getNickName();

        // 내가 follower인 상태임(내가 상대를 팔로우 중)
        switch (followEnum) {
            case Follow:
                for(Follow myFollow : myFollowList) {
                    if (this.user.getUserId().equals(myFollow.getUser().getUserId())) {
                        this.relation = true;
                    }
                    else {
                        this.relation = false;
                    }
                    this.userId = this.follower;
                    this.user = null;
                    this.follower = null;
                }
                break;
            case Follower:
                for(Follow myFollow : myFollowList) {
                    if (this.follower.equals(myFollow.getUser().getUserId())) {
                        this.relation = true;
                    }
                    else {
                        this.relation = false;
                    }
                    this.userId = this.follower;
                    this.follower = null;
                }
                break;
        }
    }
    
}
