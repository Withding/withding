import { css } from "@emotion/react";
import React from "react";

interface FundingTitleStateProps {
    title: string;
    state: string;
}

/**
 * 유저 펀딩 아이템의 텍스트 영역 컴포넌트
 * 펀딩 제목과 펀딩 상태를 표시한다.
 * @param props.title - 펀딩 제목
 * @param props.state - 펀딩 상태
 * @returns 
 */
function FundingTitleState(props: FundingTitleStateProps) {
    const title = props.title.length === 0 ? "제목을 입력해주세요." : props.title;
    return (
        <section css={style}>
            <h3>{title}</h3>
            <span
                data-state={props.state}
            >
                {props.state}
            </span>
        </section>
    );
}

const style = css`
    & > h3 {
        color: var(--black);
        font-weight: 600;
        font-size: 1.2rem;
    }

    border-top: 1px solid var(--grey-200);
    color: var(--grey-300);

    & > span {
        margin-top: 1rem;
        font-size: 0.8rem;
        display: flex;
        align-items: center;
    }

    & > span::before {
        content: '';
        display: inline-block;
        width: 7px;
        height: 7px;
        margin-right: 0.3rem;
        border-radius: 7.5px;
    }

    & > span[data-state="진행대기"]::before {
        background-color: var(--blue-300);
    }

    & > span[data-state="진행중"]::before {
        background-color: var(--green-300);
    }

    & > span[data-state="종료"]::before {
        background-color: var(--red-300);
    }

    & > span[data-state="정지"]::before {
        background-color: var(--deepgrey);
    }

    & > span[data-state="임시저장"]::before {
        background-color: var(--orange);
    }
`;


export default FundingTitleState;