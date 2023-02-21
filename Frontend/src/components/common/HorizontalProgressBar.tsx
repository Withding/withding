import React from "react";
import BaseProps from "@/types/BaseProps";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface HorizontalProgressBarProps {
    now: number;
    max: number;
    height: number;
}

/**
 * 수평 프로그래스바
 * @param props.now - 현재 값
 * @param props.max - 최대 값
 * @param props.height - 높이
 * @returns 
 */
function HorizontalProgressBar(props: BaseProps & HorizontalProgressBarProps) {
    const { now, max, height } = props;
    const percentage = now / max * 100;
    return (
        <article
            className={props?.className}
            css={style}
        >
            <Percentage
                percentage={percentage}
                height={height}
            />
        </article >

    );
}


const style = css`
    width: 100%;
    background-color: var(--grey-200);
    margin-bottom: 1rem;
`;
const Percentage = React.memo(styled.div<{
    percentage: number;
    height: number;
}>`
    width: ${({ percentage }) => percentage + "%"};
    background-color: var(--green-200);
    height: ${({ height }) => height + "px"};
`);

export default React.memo(HorizontalProgressBar);