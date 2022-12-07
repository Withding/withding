import { css } from "@emotion/react";
import React from "react";
import BaseProps from "../types/BaseProps";

function CreateButton(props: BaseProps) {
    return (
        <button
            onClick={props.onClick}
            css={style}
            className={props.className}
        >
            프로젝트 생성
        </button>
    );
}

const style = css`
    padding: 1rem;
    cursor: pointer;
    border: 1px solid;
    margin-left: 1rem;
    border-radius: 8px;
    color: var(--green-300);
    &:hover {
        background-color: var(--green-50);
        transition: 0.5s;
    }
`;

export default CreateButton;