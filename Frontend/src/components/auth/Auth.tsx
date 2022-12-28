import React, { useCallback, useEffect, useState } from "react";
import UserContext from "../../store/UserContext";

function Auth(props: { children: React.ReactNode }) {
    const [nickName, setNickname] = useState<string>("");
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [profileImage, setProfileImage] = useState<string>("");

    const onChangeUserInfo = useCallback(({
        nickName,
        isLogin,
        profileImage,
    }: {
        nickName: string;
        isLogin: boolean;
        profileImage: string;
    }) => {
        setNickname(nickName);
        setIsLogin(isLogin);
        setProfileImage(profileImage);
        const user = {
            nickName: nickName,
            isLogin: isLogin,
            profileImage: profileImage,
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
                profileImage: userInfo.profileImage,
            });
        }
    }, [onChangeUserInfo]);
    return (
        <UserContext.Provider value={{
            nickName,
            isLogin,
            profileImage,
            onChangeUserInfo,
            onResetUser
        }}>
            {props.children}
        </UserContext.Provider >
    );
}

export default Auth;