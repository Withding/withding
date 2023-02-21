import User from "@/types/User";
import UserContextProps from "@/types/UserContextProps";
import React from "react";

/**
 * 유저 Context
 */
const UserContext = React.createContext<UserContextProps>({
    isLogin: false,
    loginType: 0,
    nickName: "",
    image: "",
    onChangeUserInfo: (user: User) => {},
    onChangeProfileImage: (image: string) => {},
    onResetUser: () => {},
});

export default UserContext;