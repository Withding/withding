import { css } from "@emotion/react";
import React from "react";
import DivisionLine from "../../components/common/DivisionLine";
import OauthLoginButtons from "../../components/common/OauthButton/OauthLoginButtons";
import SignTitle from "../../components/common/SignTitle";
import SignWrapper from "../../components/common/SignWrapper";
import EmailSignup from "./EmailSignup/EmailSignup";

function Signup() {
    return (
        <div css={style}>
            <SignWrapper>
                <SignTitle
                    className="oauth-signup"
                    title={"간편 가입"}
                />
                <OauthLoginButtons />
            </SignWrapper>
            <DivisionLine />
            <SignWrapper>
                <SignTitle
                    className="email-signup"
                    title={"이메일간편 가입"} />
                <EmailSignup />
            </SignWrapper>
        </div>
    );
}

const style = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .email-signup {
        font-size: 1.5rem;
    }
`;



export default Signup;