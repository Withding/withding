import { css } from "@emotion/react";
import React from "react";
import BaseProps from "../../types/BaseProps";

interface ButtonProps {
    value: string;
    disabled?: boolean;
}

function Button(props: BaseProps & ButtonProps) {
    return (
        <button
            type="button"
            className={props.className}
            onClick={props.onClick}
            css={[style, props.css]}
            disabled={props.disabled}
        >
            {props.value}
        </button>
    );
}

const style = css`
    cursor: pointer;
    border-radius: 8px;

`;

export default React.memo(Button);