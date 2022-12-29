import { css } from "@emotion/react";
import React from "react";
/**
 * /mypage/main 에 적용되는 헤더
 * @returns 
 */
function MyPageMainHeader() {
    return (
        <div css={style}>
            <p>{"마이윗딩"}</p>
        </div>
    );
}
const style = css`
    @media screen and (min-width: 1096px) {
        display: none;
    }
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    p {
        margin-left: 1rem;
        color: var(--white);
        font-size: 1.3rem;
        font-weight: 800;
    }
    background: linear-gradient(90deg, var(--green-300) , var(--green-400));
`;

export default MyPageMainHeader;