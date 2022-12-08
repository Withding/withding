import { css } from "@emotion/react";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import BaseProps from "../types/BaseProps";

function HomeIconButton(props: BaseProps) {
    const navigator = useNavigate();
    return (
        <AiOutlineHome
            css={css`font-size: 1.5rem; margin-right: 1rem; cursor: pointer;`}
            className={props.className}
            onClick={() => navigator("/")}
        />
    );
}

export default HomeIconButton;