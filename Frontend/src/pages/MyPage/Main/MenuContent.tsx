import { css } from "@emotion/react";
import React from "react";


/**
 * MyPage/Main 본문 컴포넌트
 * @returns 
 */
function MenuContent(props: { children: React.ReactNode }) {
    return (
        <article css={style}>
            {props.children}
        </article>
    );
}

const style = css`
    min-height: 80vh;

    @media screen and (min-width: 1096px) {
        border-left: 1px solid var(--grey-200);
        padding: 1rem;
    }
    
    width: 100%;
`;

export default MenuContent;