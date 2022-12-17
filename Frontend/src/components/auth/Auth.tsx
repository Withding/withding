import React, { useCallback, useState } from "react";
import UserContext from "../../store/UserContext";

function Auth(props: { children: React.ReactNode }) {
    const [nickname, setNickname] = useState<string>("");
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [profileImage, setProfileImage] = useState<string>("");

    const onChangeNickname = useCallback((nickname: string) => {
        setNickname(nickname);
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
            nickname,
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