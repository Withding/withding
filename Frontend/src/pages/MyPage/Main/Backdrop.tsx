import { css } from "@emotion/react";
import React from "react";

/**
 * 백드롭 그라데이션
 * @returns 
 */
function Backdrop() {
    return (
        <div css={style}>
        </div>
    );
}

const style = css`
    background: linear-gradient(90deg, var(--green-300) , var(--green-400));
    width: 100%;
    z-index: -1;
    @media screen and (min-width: 1096px) {
        height: 30vh;
        position: absolute;
    }

    @media screen and (max-width: 1095px) {
        height: 3rem;
    }
`;

export default Backdrop;