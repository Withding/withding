import InputProps from "@/types/InputProps";
import React from "react";
import Input from "./Input";


interface LabelInputProps {
    input?: InputProps;
    label: string;
}

/**
 * LabelInput 컴포넌트
 * @returns 
 */
function LabelInput(props: LabelInputProps) {
    return (
        <label>
            <span>{props.label}</span>
            <Input
                {...props.input}
            />
        </label>
    );
}

export default LabelInput;