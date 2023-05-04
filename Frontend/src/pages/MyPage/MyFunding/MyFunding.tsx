import { css } from "@emotion/react";
import React from "react";
import Header from "./Header";
import Content from "./Content";

function MyFunding() {
    return (
        <div css={style}>
            <Header />
            <Content />
        </div>
    );
}

const style = css`
    width: 100%;
    display: flex;
    flex-direction: column;
`;
export default MyFunding;