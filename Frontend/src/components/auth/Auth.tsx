import React, { useCallback, useState } from "react";
import UserContext from "../../store/UserContext";

function Auth(props: { children: React.ReactNode }) {
    const [nickName, setNickname] = useState<string>("");
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [profileImage, setProfileImage] = useState<string>("");

    const onChangeNickname = useCallback((nickName: string) => {
        setNickname(nickName);
    }, []);

    const onChangeIsLogin = useCallback((isLogin: boolean) => {
        setIsLogin(isLogin);
    }, []);

    const onChangeProfileImage = useCallback((profileImage: string) => {
        setProfileImage(profileImage);
    }, []);

    const onResetUser = useCallback(() => {

    }, []);
    return (
        <UserContext.Provider value={{
            nickName,
            isLogin,
            profileImage,
            onChangeNickname,
            onChangeIsLogin,
            onChangeProfileImage,
            onResetUser
        }}>
            {props.children}
        </UserContext.Provider >
    );
}

export default Auth;