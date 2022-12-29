import User from "@/types/User";
import UserContextProps from "@/types/UserContextProps";
import React from "react";

/**
 * 유저 Context
 */
const UserContext = React.createContext<UserContextProps>({
    isLogin: false,
    nickName: "",
    profileImage: "",
    onChangeUserInfo: (user: User) => {},
    onResetUser: () => {},
});

export default UserContext;