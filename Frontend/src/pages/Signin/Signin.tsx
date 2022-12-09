import { css } from "@emotion/react";
import React from "react";
import NormalLogin from "./NormalLogin";

import OauthLoginButtons from "./OauthButton/OauthLoginButtons";
import SignupMent from "./SignupMent";
import SignTitle from "../../components/common/SignTitle";

/**
 * Sign in Main Component 
 * @returns 
 */
function Index() {
    return (
        <div css={style}>
            <SignTitle title={"로그인"} />
            <NormalLogin />
            <OauthLoginButtons />
            <SignupMent />
        </div>
    );
}

const style = css`
    width: 100%;
    max-width: 400px;
    min-height: 100vh;
    padding: 1rem;
    background-color: var(--white);
    display: flex;
    flex-direction: column;
`;

export default Index;