import React, { useEffect } from "react";
import fetchKakaoAuthCode from "../../utils/RequestApis/Oauth/fetchKakaoAuthCode";

function Kakao() {
    useEffect(() => {

    }, []);
    const code = new URLSearchParams(window.location.search).get("code") ?? "";
    fetchKakaoAuthCode(code)
        .then((res) => {
            console.log(res);
        });
    return (
        <div>
            <p>{code}</p>
        </div>
    );
}

export default Kakao;