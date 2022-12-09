import { css } from "@emotion/react";
import React from "react";

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
    min-height: 100vh;
    padding: 1rem;
    background-color: var(--white);
    display: flex;
    flex-direction: column;
`;

export default React.memo(SignWrapper);