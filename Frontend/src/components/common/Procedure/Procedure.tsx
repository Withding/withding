import React from "react";
import ProcedureType from "@/types/ProcedureType";
import { css } from "@emotion/react";

/**
 * 진행과정 리스트의 Item 컴포넌트
 * @returns 
 */
function Procedure(props: ProcedureType) {
    return (
        <li
            css={style}
        >
            <h2>{`${props.title}`}</h2>
            <span>{`${props.description}`}</span>
        </li>
    );
}


const style = css`
    font-size: 1.1rem;
    line-height: 1.5;
    position: relative;
    padding-left: 3rem;
    border-left: 3px solid var(--green-300);
    padding-bottom: 1rem;
    display: columns;

    align-items: center;
    justify-content: center;
    h2 {
        font-weight: 800;
    }

    span {
        font-size: 1rem;
    }

    &::before {
        content: "";
        position: absolute;
        left: -11px;
        border-radius: 50%;
        background-color: var(--green-300);
        display: block;
        top: 0;
        width: 13px;
        height: 13px;
        border: 3px solid var(--green-300);
    }

    &:last-child {
        padding-bottom: 0;
        border-left: 3px solid var(--white);
    }
`;
export default Procedure;