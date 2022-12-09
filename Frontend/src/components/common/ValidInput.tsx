import { css } from "@emotion/react";
import React from "react";
import InputProps from "../types/InputProps";
import Input from "./Input";

/**
 * 입력한값의 유효성 결과를 알려주는 Input Label 컴포넌트
 * @param props.input - input 태그의 속성
 * @param props.valid - 유효성 검사 결과
 * @param props.msg - 유효성 검사 결과 메시지
 * @returns 
 */

interface ValidInputProps {
    input: InputProps;
    valid: boolean;
    msg: string;
}
function ValidInput(props: ValidInputProps) {
    return (
        <label css={style}>
            <Input {...props.input}
                className={props.valid ? "" : "invalid"}
            />
            <span>{props.valid ? "" : props.msg}</span>
        </label>
    );
}

const style = css`
    & > input.invalid {
        border: 1px solid #f66;
        background: rgba(255,155,155,.06);
    }

    & > span {
        line-height: 2;
        color: rgb(242, 85, 85);
        font-size: 0.9rem;
    }
`;

export default ValidInput;