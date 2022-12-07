import { css } from "@emotion/react";
import React from "react";
import BaseProps from "../types/BaseProps";

function CreateButton(props: BaseProps) {
    return (
        <button
            onClick={props.onClick}
            css={style}
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
`;

export default CreateButton;