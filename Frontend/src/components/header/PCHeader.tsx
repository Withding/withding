import { css } from "@emotion/react";
import React from "react";
import SearchHeader from "./PageHeaders/SearchHeader";

/**
 * PC환경 헤더
 * @returns 
 */
function PCHeader() {
    return (
        <div css={css`
            display: none;
            @media screen and (min-width: 1096px) {
                display: block;
            }
        `}>
            <SearchHeader />
        </div>
    );
}

export default PCHeader;