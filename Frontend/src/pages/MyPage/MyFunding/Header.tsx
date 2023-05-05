import ContentInner from "@/components/common/ContentInner";
import { css } from "@emotion/react";
import React from "react";

function Header() {
    return (
        <header css={style}>
            <ContentInner>
                <h1>만든 프로젝트</h1>
            </ContentInner>
        </header>

    );
}

const style = css`
    width: 100%;
    height: 6rem;
    border-top: 1px solid var(--grey-200);
    border-bottom: 1px solid var(--grey-200);
    display: flex;
    justify-content: center;
    padding-top: 2rem;
    padding-bottom: 2rem;
    h1 {
        font-size: 1.8rem;
        font-weight: 700;
    }
`;

export default Header;