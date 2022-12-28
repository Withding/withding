import UserContextProps from "@/types/UserContextProps";
import React from "react";

/**
 * 유저 Context
 */
const UserContext = React.createContext<UserContextProps>({
    isLogin: false,
    nickName: "",
    profileImage: "",
    onChangeUserInfo: (
        { nickName, isLogin, profileImage }:
        { nickName: string, isLogin: boolean, profileImage: string}) => {},
    onResetUser: () => {},
});

export default UserContext;