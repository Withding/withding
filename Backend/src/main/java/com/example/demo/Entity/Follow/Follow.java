package com.example.demo.Entity.Follow;

import com.example.demo.Entity.User.User;
import com.example.demo.Enum.FollowEnum;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@Data
@Entity
@Table(name = "follow")
public class Follow {

    public Follow(final User user){
        this.user = user;
    }

    public Follow(final User user, final Long targetId) {
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

    @Transient
    private String image;


    /**
     * 상대와 내가 관계가 있는지 확인하는 함수(서로 follow, follower 관계인지 확인)
     * @param myFollowList 나와 관련된 follow 목록
     */
    public void isFollowRelationToMe(final List<Follow> myFollowList, final FollowEnum followEnum, final String PROFILE_IMAGE_URL) {
        this.userId = user.getUserId();
        this.name = user.getNickName();
        this.image = PROFILE_IMAGE_URL + user.getProfileImage().getProfileImage();
        this.user = null;
        // 내가 follower인 상태임(내가 상대를 팔로우 중)
        switch (followEnum) {
            case Follow:
                for(Follow myFollow : myFollowList) {
                    if (this.userId.equals(myFollow.getUser().getUserId())) {
                        this.relation = true;
                    }
                    else {
                        this.relation = false;
                    }
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
                }
                break;
        }
    }
    
}