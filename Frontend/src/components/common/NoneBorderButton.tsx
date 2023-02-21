import { css } from "@emotion/react";
import React from "react";


interface NoneBorderButtonProps {
    value: string;
    onClick?: () => void;
    style?: React.CSSProperties;
}

function NoneBorderButton(props: NoneBorderButtonProps) {
    return (
        <button
            css={style}
            onClick={props.onClick}
            style={props.style}
        >
            {props.value}
        </button>
    );
}

const style = css`
    border: none;
    cursor: pointer;
`;
export default NoneBorderButton;