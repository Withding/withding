package com.example.demo.Enum;

public enum FollowEnum {

    Follow("팔로우"),
    Follower("팔로워");

    private String state;

    FollowEnum(String state) {
        this.state = state;
    }
    
}
