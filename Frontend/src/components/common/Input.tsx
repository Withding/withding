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
    border: 1px solid var(--grey-200);
    &:hover {
        border: 1px solid var(--grey-500);
    }

    &:focus {
        border: 1px solid var(--green-200);
    }
`;

export default React.memo(Input);