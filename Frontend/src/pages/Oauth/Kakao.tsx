import React, { useEffect } from "react";
import fetchKakaoAuthCode from "../../utils/RequestApis/Oauth/kakao/fetchKakaoAuthCode";
import fetchUserInfo from "../../utils/RequestApis/Oauth/kakao/fetchUserInfo";

function Kakao() {
    useEffect(() => {

    }, []);
    const code = new URLSearchParams(window.location.search).get("code") ?? "";
    fetchKakaoAuthCode(code)
        .then((res) => {
            fetchUserInfo(res.data).
                then((res) => console.log(res));
        });
    return (
        <div>
            <p>{code}</p>
        </div>
    );
}

export default Kakao;