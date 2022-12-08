import { css } from "@emotion/react";
import React from "react";
import PreviousButton from "../../common/PreviousButton";
import Login from "../Login";

function LoginHeader() {
    return (
        <div
            css={style}
        >
            <PreviousButton
                className="previous-button"
            />
            <Login />
        </div>
    );
}

const style = css`
    width: 100%;
    display: flex;
    flex-direction: column;

    @media screen and (min-width: 1096px){
        display: none;
    }

    @media screen and (max-width: 1095px) {
        width: 100%;
        margin-left: 1rem;
        margin-right: 1rem;
        dispaly: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        & > .previous-button {
            cursor: pointer;
        }
    }
`;

export default LoginHeader;