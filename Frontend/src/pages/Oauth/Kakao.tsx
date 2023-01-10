import React, { useContext, useEffect } from "react";
import fetchKakaoAuthCode from "@/utils/RequestApis/Oauth/kakao/fetchKakaoAuthCode";
import fetchUserInfo from "@/utils/RequestApis/Oauth/kakao/fetchUserInfo";
import KakaoAuthType from "@/types/KakaoAuthType";
import UserContext from "@/store/UserContext";
import User from "@/types/User";
import { useNavigate } from "react-router-dom";

/**
 * 카카오 로그인 처리하는 컴포넌트
 * @returns 
 */
function Kakao() {
    const navigator = useNavigate();
    const { onChangeUserInfo } = useContext(UserContext);
    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get("code") ?? "";
        fetchKakaoAuthCode(code)
            .then((res: KakaoAuthType) => {
                fetchUserInfo(res.access_token).
                    then((res: User) => {
                        onChangeUserInfo({
                            nickName: res.nickName,
                            isLogin: true,
                            image: res.image,
                            accessToken: res.accessToken,
                        });
                        navigator("/");
                    });
            });
    }, [navigator, onChangeUserInfo]);

    return (
        <React.Fragment>

        </React.Fragment>
    );
}

export default Kakao;