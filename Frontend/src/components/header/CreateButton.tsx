import { css } from "@emotion/react";
import React from "react";
import Button from "../common/Button";
import BaseProps from "@/types/BaseProps";
import { useNavigate } from "react-router-dom";

function CreateButton(props: BaseProps) {
    const navigator = useNavigate();
    return (
        <Button
            css={style}
            className={props.className}
            value={"프로젝트 생성"}
            onClick={() => navigator("/project/intro")}
        />
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