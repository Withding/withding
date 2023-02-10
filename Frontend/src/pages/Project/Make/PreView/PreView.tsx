import { css } from "@emotion/react";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

function PreView() {
    return (
        <article
            css={style}
        >
            <h1>프로젝트 미리보기</h1>
            <p className="description">입력한 내용 바탕으로 미리보기가 가능해요</p>
            <a className="link" href="#"><AiOutlineSearch />프로젝트 미리보기</a>
        </article>
    );
}


const style = css`
    a.link {
        border-radius: 4px;
        display: inline-flex;
        justify-content: center;
        align-items:  center;
        color: white;
        min-width: 12rem;
        height: 48px;
        background-color: var(--grey-300);
        text-decoration: none;
    }

    a.link:hover {
        background-color: var(--grey-400);
    }

    svg {
        font-size: 1.5rem;
        margin-right: 0.5rem;
    }
`;
export default PreView;