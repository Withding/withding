import { css } from "@emotion/react";
import React from "react";
import BaseProps from "@/types/BaseProps";

/**
 * Menu Content
 * @returns 
 */
function Content(props: BaseProps) {
    return (
        <div css={style} className={props.className}>Content</div>
    );
}

const style = css`
    min-height: 150vh;
    background: white;
    @media screen and (min-width: 1095px) {
        max-width: 1025px;
    }
`;

export default Content;