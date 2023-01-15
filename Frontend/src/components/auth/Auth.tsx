import User from "@/types/User";
import React, { useCallback, useEffect, useState } from "react";
import UserContext from "@/store/UserContext";

/**
 * 인증 ContextAPI
 * @param props.children
 * @returns 
 */


const InitUser = {
    nickName: "",
    isLogin: false,
    image: "",
    accessToken: "",
    loginType: 0,
};
function Auth(props: { children: React.ReactNode }) {
    const [user, setUser] = useState<User>(InitUser);
    const onChangeUserInfo = useCallback((_user: User) => {
        setUser(() => _user);
        localStorage.setItem("user", JSON.stringify(_user));
    }, []);


    const onChangeProfileImage = useCallback((image: string) => {
        setUser({
            ...user,
            image: image
        });
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    const onResetUser = useCallback(() => {

    }, []);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            const userInfo = JSON.parse(user);
            onChangeUserInfo({
                nickName: userInfo.nickName,
                isLogin: userInfo.isLogin,
                image: userInfo.image,
                accessToken: userInfo.accessToken,
                loginType: userInfo.loginType
            });
        }
    }, [onChangeUserInfo]);
    return (
        <UserContext.Provider value={{
            nickName: user.nickName ?? "",
            isLogin: user.isLogin ?? false,
            image: user.image ?? "",
            loginType: user.loginType ?? 0,
            onChangeUserInfo,
            onChangeProfileImage,
            onResetUser
        }}>
            {props.children}
        </UserContext.Provider >
    );
}

export default Auth;
