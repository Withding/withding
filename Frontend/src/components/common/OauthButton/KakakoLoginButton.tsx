import React, { useCallback } from "react";
import { RiKakaoTalkFill } from "react-icons/ri";
import OauthLoginButton from "../OauthLoginButton";

function KakakoLoginButton() {
    const onClickHandler = useCallback(() => {
        window.location.href
            = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
    }, []);
    return (
        <React.Fragment>
            <OauthLoginButton
                text={"카카오로 시작하기"}
                logo={<RiKakaoTalkFill />}
                backgroundColor={"#FEE500"}
                fontColor={"#495057"}
                onClick={onClickHandler}
            />
        </React.Fragment>
    );
}

export default KakakoLoginButton;