import { css } from "@emotion/react";
import React from "react";
import { IoAlertCircle } from "react-icons/io5";

function AlertBox(props: { value: string }) {
    return (
        <section css={style}>
            <span><IoAlertCircle /><p>{props.value}</p></span>
        </section>
    );
}

const style = css`
    margin-top: 1rem;
    font-size: 0.8rem;
    color: var(--grey-500);
    span {
        display: inline-flex;
    }
    svg {
        font-size: 1.1rem;
        margin-right: 0.5rem;
    }
    padding: 1rem;
    background-color: var(--grey-100);
`;

export default AlertBox;