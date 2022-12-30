import { css } from "@emotion/react";
import React, { useMemo } from "react";
import SummaryItem from "./SummaryItem";


/**
 * 요약 리스트 컴포넌트
 */
function SummaryList() {
    const items = useMemo(() => [
        { key: "펀딩", value: "0" },
        { key: "포인트", value: "123,000" },
    ], []);
    return (
        <ul css={style}>
            {items.map((item) => (
                <SummaryItem
                    key={item.key}
                    item={item}
                />
            ))}
        </ul>
    );
}

const style = css`
    width: 100%;
    height: 100%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
`;

export default SummaryList;