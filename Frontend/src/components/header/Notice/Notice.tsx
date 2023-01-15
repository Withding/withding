import { css } from "@emotion/react";
import React from "react";
import { IoIosNotificationsOutline } from "react-icons/io";

import BaseProps from "../../../types/BaseProps";

function Notice(props: BaseProps) {
    return (
        <IoIosNotificationsOutline
            className={props.className}
            css={style}
        />
    );
}

const style = css`
    font-size: 1.8rem;
    cursor: pointer;
`;



export default Notice;