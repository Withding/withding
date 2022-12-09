import React from "react";
import { RiKakaoTalkFill } from "react-icons/ri";
import OauthLoginButton from "../../../components/common/OauthLoginButton";

function KakakoLoginButton() {
    return (
        <React.Fragment>
            <OauthLoginButton
                text={"카카오 로그인"}
                logo={<RiKakaoTalkFill />}
                backgroundColor={"#FEE500"}
                fontColor={"#495057"}
            />
        </React.Fragment>
    );
}

export default KakakoLoginButton;