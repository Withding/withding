import React from "react";
import InputProps from "../../types/InputProps";
import ValidInput from "./ValidInput";


interface LabelValidInputPorps {
    label: string;
    input: InputProps;
    valid: boolean;
    msg: string;
    className?: string;
}

/**
 * Label Text와 Input을 함께 사용할 수 있는 컴포넌트
 * @returns 
 */
function LabelValidInput(props: LabelValidInputPorps) {
    return (
        <label className={props.className}>
            <span>{props.label}</span>
            <ValidInput
                input={props.input}
                valid={props.valid}
                msg={props.msg}
            />
        </label>
    );
}

export default LabelValidInput;