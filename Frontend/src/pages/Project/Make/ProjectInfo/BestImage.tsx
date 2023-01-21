import { css } from "@emotion/react";
import React from "react";
import { AiOutlineCamera } from "react-icons/ai";

function BestImage() {
    return (
        <section css={style}>
            <label>
                <span>대표 이미지</span>
                <span className="sub-description">
                    {"작은 이미지를 넣게되면 이미지가 이상하게 보일수도 있습니다."}
                </span>
                <button type="button">
                    <AiOutlineCamera /><p>{"등록하기"}</p>
                </button>
            </label>
        </section>
    );
}

const style = css`
    button {
        width: 9rem;
        background-color: var(--grey-500);
        color: var(--white);
        border-radius: 6px;
        cursor: pointer;
        display: inline-flex;
        justify-content: center;
        align-items: center;
    }

    button:hover {
        background-color: var(--grey-400);
    }

    button > svg {
        font-size: 1.2rem;
        margin-right: 0.5rem;
    }
`;
export default BestImage;