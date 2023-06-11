import UserInfoContextProps from "@/types/UserInfoContextProps";
import React from "react";

const UserInfoContext = React.createContext<UserInfoContextProps>({
    userInfo: {
        nickname: "",
        fundingCount: 0,
        followerCount: 0,
        followingCount: 0,
        isFollowing: false,
        userImage: "",
        onFollow: () => {},
        onUnfollow: () => {}
    },
    list: {
        fundingList: [],
        lastPage: 0,
        isFetchingNextPage: false,
        fetchNextPage: () => {},
        hasNextPage: false
    }
    
});

export default UserInfoContext;