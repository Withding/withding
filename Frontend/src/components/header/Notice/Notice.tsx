import { css } from "@emotion/react";
import React from "react";
import { IoIosNotificationsOutline } from "react-icons/io";

import BaseProps from "../../types/BaseProps";

function Notice(props: BaseProps) {
    return (
        <IoIosNotificationsOutline
            className={props.className}
            css={style}
        />
    );
}

const style = css`
    font-size: 2rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    cursor: pointer;
`;



export default Notice;