import User from "@/types/User";
import React, { useCallback, useEffect, useState } from "react";
import UserContext from "../../store/UserContext";

function Auth(props: { children: React.ReactNode }) {
    const [nickName, setNickname] = useState<string>("");
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [image, setImage] = useState<string>("");
    const [accessToken, setAccessToken] = useState<string>("");
    const onChangeUserInfo = useCallback((_user: User) => {
        const { nickName, isLogin, image, accessToken } = _user;
        setNickname(nickName ?? "");
        setIsLogin(isLogin ?? false);
        setImage(image ?? "");
        setAccessToken(accessToken ?? "");
        const user = {
            nickName: nickName,
            isLogin: isLogin,
            image: image,
            accessToken: accessToken
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
                accessToken: userInfo.accessToken
            });
        }
    }, [onChangeUserInfo]);
    return (
        <UserContext.Provider value={{
            nickName,
            isLogin,
            image,
            onChangeUserInfo,
            onResetUser
        }}>
            {props.children}
        </UserContext.Provider >
    );
}

export default Auth;