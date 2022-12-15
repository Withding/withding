import { css } from "@emotion/react";
import React from "react";
import InputProps from "../../types/InputProps";
import Input from "./Input";
import BaseProps from "../../types/BaseProps";

/**
 * 입력한값의 유효성 결과를 알려주는 Input Label 컴포넌트
 * @param props.input - input 태그의 속성
 * @param props.valid - 유효성 검사 결과
 * @param props.msg - 유효성 검사 결과 메시지
 * @returns 
 */

interface ValidInputProps {
    input?: InputProps;
    valid: boolean;
    msg: string;
}
function ValidInput(props: ValidInputProps & BaseProps) {
    return (
        <div css={style}>
            <Input {...props.input}
                error={!props.valid}
            />
            <span>{props.valid ? "" : props.msg}</span>
        </div>
    );
}

const style = css`
    & > span {
        line-height: 2;
        color: rgb(242, 85, 85);
        font-size: 0.9rem;
    }
`;

export default ValidInput;