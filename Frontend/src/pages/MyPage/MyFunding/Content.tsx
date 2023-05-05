import ContentInner from "@/components/common/ContentInner";
import { css } from "@emotion/react";
import React from "react";
import MyFundingList from "./MyFundingList";

function Content() {
    return (
        <main css={style}>
            <ContentInner>
                <MyFundingList />
            </ContentInner>
        </main>
    );
}

const style = css`  
    width: 100%;
    min-height: 100vh;
    background-color: var(--grey-200);
    display: inline-flex;
    justify-content: center;
`;

export default Content;