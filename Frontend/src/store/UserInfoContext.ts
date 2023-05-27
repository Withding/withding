import UserInfoContextProps from "@/types/UserInfoContextProps";
import React from "react";

const UserInfoContext = React.createContext<UserInfoContextProps>({
    nickname: "",
    fundingCount: 0,
    followerCount: 0,
    followingCount: 0,
    isFollowing: false,
    userImage: "",
    onFollow: () => {},
    onUnfollow: () => {}
});

export default UserInfoContext;