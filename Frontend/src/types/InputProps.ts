import React from "react";
interface InputProps {
    value?: string;
    type?: string;
    name?: string;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    maxLength?: number;
    min?: string | number;
    max?: string | number;
    defaultValue?: string;
}

export default InputProps;