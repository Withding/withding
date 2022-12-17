import UserContextProps from "@/types/UserContextProps";
import React from "react";

/**
 * 유저 Context
 */
const UserContext = React.createContext<UserContextProps>({
    isLogin: false,
    nickName: "",
    profileImage: "",
    onChangeNickname: () => {},
    onChangeProfileImage: () => {},
    onChangeIsLogin: () => {},
    onResetUser: () => {},
});

export default UserContext;