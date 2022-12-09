import { css } from "@emotion/react";
import React from "react";


/**
 * Signin, Signup 컴포넌트를 감싸는 컴포넌트
 * @param props.children - Signin, Signup 컴포넌트를 감싸는 컴포넌트
 * @returns 
 */
function SignWrapper(props: { children: React.ReactNode }) {
    return (
        <div css={style}>
            {props.children}
        </div>
    );
}

const style = css`
    width: 100%;
    max-width: 400px;
    padding: 1rem;
    background-color: var(--white);
    display: flex;
    flex-direction: column;
`;

export default React.memo(SignWrapper);