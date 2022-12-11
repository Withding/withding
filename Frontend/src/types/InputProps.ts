import React from "react";
interface InputProps {
    value?: string;
    type?: string;
    name?: string;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export default InputProps;