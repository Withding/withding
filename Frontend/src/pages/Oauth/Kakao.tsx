import React, { useContext, useEffect } from "react";
import fetchKakaoAuthCode from "@/utils/RequestApis/Oauth/kakao/fetchKakaoAuthCode";
import fetchUserInfo from "@/utils/RequestApis/Oauth/kakao/fetchUserInfo";
import KakaoAuthType from "@/types/KakaoAuthType";
import UserContext from "@/store/UserContext";
import User from "@/types/User";
import { useNavigate } from "react-router-dom";

function Kakao() {
    const navigator = useNavigate();
    const { onChangeIsLogin, onChangeNickname, onChangeProfileImage, isLogin } = useContext(UserContext);
    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get("code") ?? "";
        fetchKakaoAuthCode(code)
            .then((res: KakaoAuthType) => {
                fetchUserInfo(res.access_token).
                    then((res: User) => {
                        onChangeIsLogin(true);
                        onChangeNickname(res.nickname);
                        onChangeProfileImage(res.profileImage);
                        navigator("/");
                    });
            });
    }, [navigator, onChangeIsLogin, onChangeNickname, onChangeProfileImage]);

    return (
        <React.Fragment>

        </React.Fragment>
    );
}

export default Kakao;