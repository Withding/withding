import { css } from "@emotion/react";
import React from "react";
import SummaryList from "./SummaryList";


/**
 * 요약 컴포넌트
 * @returns 
 */
function Summary() {
    return (
        <section css={style}>
            <SummaryList />
        </section>
    );
}

const style = css`
    border-radius: 16px;
    width: 100%;
    height: 100%;
    border: 1px solid var(--grey-200);
    padding: 1rem;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
    @media screen and (min-width: 1096px) {
        max-height: 12rem;
    }

    @media screen and (max-width: 1095px) {
        margin-top: 1rem;
        max-height: 6rem;
    }
`;

export default Summary;