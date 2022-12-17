import React, { useEffect } from "react";
import fetchKakaoAuthCode from "@/utils/RequestApis/Oauth/kakao/fetchKakaoAuthCode";
import fetchUserInfo from "@/utils/RequestApis/Oauth/kakao/fetchUserInfo";
import KakaoAuthType from "@/types/KakaoAuthType";

function Kakao() {
    useEffect(() => {

    }, []);
    const code = new URLSearchParams(window.location.search).get("code") ?? "";
    fetchKakaoAuthCode(code)
        .then((res: KakaoAuthType) => {
            console.log("aa", res.access_token);
            fetchUserInfo(res.access_token).
                then((res) => console.log(res));
        });
    return (
        <div>
            <p>{code}</p>
        </div>
    );
}

export default Kakao;