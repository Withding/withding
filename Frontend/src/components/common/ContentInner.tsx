import { css } from "@emotion/react";
import React from "react";

/**
 * pc버전 max-width가 정해져있는 div
 * @returns 
 */
function ContentInner(props: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div css={style} className={`.inner ${props?.className}`}>{props.children}</div>
    );
}

const style = css`
    width: 100%;
    @media screen and (min-width: 1096px) {
        max-width: var(--pc-max-width);
        min-width: var(--pc-max-width);
    }

    @media screen and (max-width: 1095px) {
        display: inline-flex;
        justify-content: center;
    }

`;

export default ContentInner;