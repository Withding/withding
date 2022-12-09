/* eslint-disable no-unused-vars */
import { css } from "@emotion/react";
import React from "react";
import BaseProps from "../types/BaseProps";
import InputProps from "../types/InputProps";

/**
 * 공용으로 사용되는 Input 컴포넌트
 */

function Input(props: BaseProps & InputProps) {
    return (
        <input
            {...props}
            css={style}
        />
    );
}

const style = css`
    border-radius: 2px;
    width: 100%;
    border: 1px solid var(--grey-300);
    font-size: 1.1rem;
    font-weight: 300;
    line-height: 1.2;
    &:hover {
        border: 1px solid var(--grey-500);
    }

    &:focus {
        border: 1px solid var(--green-200);
    }
`;

export default Input;