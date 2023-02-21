import { css } from "@emotion/react";
import React from "react";

interface SummaryItemProps {
    item: {
        key: string;
        value: string;
    }
}

/**
 * SummaryItem 컴포넌트
 * 요약 해서 보여줄 아이템
 * @param props.item - 요약 아이템 정보 
 * @returns 
 */
function SummaryItem(props: SummaryItemProps) {
    return (
        <li css={style}>
            <b>{props.item.value}</b>
            <p>{props.item.key}</p>
        </li>
    );
}

const style = css`
    position: relative;
    cursor: pointer;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    b {
        font-size: 1.4rem;
        font-weight: 600;
        margin-bottom: 1rem;
    }
    p {
        font-size: 1.1rem;
    }
    &::before {
        content: "";
        width: 1px;
        height: 60%;
        background-color: var(--grey-200);
        position: absolute;
        left: 0;
    }

    &:first-child::before {
        display: none;
    }
`;

export default React.memo(SummaryItem);