import User from "@/types/User";
import React, { useCallback, useEffect, useState } from "react";
import UserContext from "@/store/UserContext";

/**
 * 인증 ContextAPI
 * @param props.children
 * @returns 
 */
function Auth(props: { children: React.ReactNode }) {
    const [nickName, setNickname] = useState<string>("");
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [image, setImage] = useState<string>("");
    const [loginType, setLoginType] = useState<number>(0);
    const onChangeUserInfo = useCallback((_user: User) => {
        const { nickName, isLogin, image, accessToken, loginType } = _user;
        setNickname(nickName ?? "");
        setIsLogin(isLogin ?? false);
        setImage(image ?? "");
        setLoginType(loginType ?? 0);
        const user = {
            nickName: nickName,
            isLogin: isLogin,
            image: image,
            accessToken: accessToken,
            loginType: loginType
        };
        localStorage.setItem("user", JSON.stringify(user));
    }, []);


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
            nickName,
            isLogin,
            image,
            loginType,
            onChangeUserInfo,
            onResetUser
        }}>
            {props.children}
        </UserContext.Provider >
    );
}

export default Auth;
