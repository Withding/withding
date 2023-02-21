import PreviousButton from "@/components/common/PreviousButton";
import { css } from "@emotion/react";
import React, { useCallback } from "react";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

/**
 * 기본 모바일 헤더
 * @returns 
 */
function DefaultHeader() {
    const navigator = useNavigate();

    const goHomeHandler = useCallback(() => {
        navigator("/main");
    }, [navigator]);
    return (
        <div css={style}>
            <PreviousButton />
            <div className="right">
                <AiOutlineSearch />
                <AiOutlineHome onClick={goHomeHandler} />
            </div>
        </div>
    );
}

const style = css`
    display: inline-flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 1rem;
    font-size: 1.5rem;
    color: var(--grey-500);
    .right {
        svg {
            cursor: pointer;
            margin-left: 0.5rem;
        }
    }
`;

export default DefaultHeader;