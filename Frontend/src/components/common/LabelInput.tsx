import InputProps from "@/types/InputProps";
import { css } from "@emotion/react";
import React from "react";
import Input from "./Input";


interface LabelInputProps {
    input?: InputProps;
    subDescription?: string;
    label: string;
}

/**
 * LabelInput 컴포넌트
 * @returns 
 */
function LabelInput(props: LabelInputProps) {
    return (
        <label css={css`
            .sub-description { margin-top: 1rem;}
        `}>
            <span>{props.label}</span>
            {props.subDescription &&
                <span className="sub-description">{props.subDescription}</span>
            }
            <Input
                {...props.input}
            />
        </label>
    );
}

export default LabelInput;