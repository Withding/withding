import { css } from "@emotion/react";
import React from "react";
import NormalLogin from "./NormalLogin";
import OauthLoginButton from "../../components/common/OauthLoginButton";

import { RiKakaoTalkFill } from "react-icons/ri";

/**
 * Sign in Main Component 
 * @returns 
 */
function Index() {
    return (
        <div css={style}>
            <h1>로그인</h1>
            <NormalLogin />
            <OauthLoginButton
                text={"카카오 로그인"}
                logo={<RiKakaoTalkFill />}
                backgroundColor={"#FEE500"}
                fontColor={"#495057"}
            />
        </div>
    );
}

const style = css`
    width: 100%;
    max-width: 400px;
    min-height: 100vh;
    padding: 1rem;
    padding-top: 4rem;
    background-color: var(--white);
    display: flex;
    flex-direction: column;

    h1 {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 1.3rem;
    }
    
    @media screen and (min-width: 1096px){
        
        
    }

    @media screen and (max-width: 1095px) {
        h1 {
            font-size: 1.8rem;
        }
    }
`;

export default Index;