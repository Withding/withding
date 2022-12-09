import { css } from "@emotion/react";
import React from "react";

function SignTitle(props: { title: string }) {
    return (
        <h1 css={style}>{props.title}</h1>
    );
}

const style = css`
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.3rem;
    padding-top: 4rem;
    @media screen and (max-width: 1095px) {
        font-size: 1.8rem;
    }
`;

export default SignTitle;