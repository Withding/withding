import { css } from "@emotion/react";
import React from "react";


/**
 * 구분선
 * @returns 
 */
function DivLine() {
    return (
        <hr css={style} />
    );
}

const style = css`
    width: 100%;
    border: 6px solid var(--white);

    @media screen and (max-width: 1095px) {
        border: 5px solid var(--grey-200);
    }
`;

export default DivLine;