import { css } from "@emotion/react";
import React from "react";
import { useNavigate } from "react-router-dom";

function SignupMent() {
    const navigator = useNavigate();
    return (
        <div css={style}>
            <p>{"아직 윗딩 계정이 없으신가요?"}</p>
            <a onClick={() => navigator("/signup")}>{"회원 가입"}</a>
        </div>
    );
}

const style = css`
    position: relative;
    width: 100%;    
    display: inline-flex;
    justify-content: center;
    margin-top: 3rem;
    font-size: 0.9rem;
    color: var(--grey-400);
    & > a {
        margin-left: 0.3rem;
        cursor: pointer;
        color: var(--primary-300);
        text-decoration: underline;
    }
`;

export default SignupMent;