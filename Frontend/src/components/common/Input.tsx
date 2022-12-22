/* eslint-disable no-unused-vars */
import styled from "@emotion/styled";
import React from "react";
import BaseProps from "../../types/BaseProps";
import InputProps from "../../types/InputProps";

/**
 * 공용으로 사용되는 Input 컴포넌트
 */

function Input(props: BaseProps & InputProps & { error?: boolean }) {
    // console.log(props.error);
    return (
        <InputTag
            error={props.error || false}
            {...props}
        />
    );
}

const InputTag = React.memo(styled.input<{ error: boolean }>`
    border-radius: 2px;
    width: 100%;
    border: 1px solid var(--grey-200);
    &[type="text"]:hover, &[type="password"]:hover, &[type="email"]:hover {
        border: ${props => props.error ? "1px solid #f66" : "1px solid var(--grey-500)"};
    }

    &[type="submit"]:hover {
        cursor: pointer;
    }

    &:focus {
        border: ${props => props.error ? "1px solid #f66" : "1px solid var(--green-200)"};
    }
    border: ${props => props.error && "1px solid #f66"};
    background: ${props => props.error && "rgba(255, 155, 155, .06)"};
`);

export default React.memo(Input);