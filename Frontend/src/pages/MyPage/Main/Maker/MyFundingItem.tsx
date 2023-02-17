import Funding from "@/types/Funding";
import { css } from "@emotion/react";
import React from "react";

/**
 * 내가 작성한 펀딩
 * @returns 
 */
function MyFundingItem(
    props: Funding
) {
    return (
        <li
            css={style}
        >
            <figure>
                <img src={props.image} alt="프로젝트 이미지" />
            </figure>
            <h1>{props.title}</h1>
            <p className="state">{props.state}</p>
        </li>
    );
}

const style = css`
    cursor: pointer;

    display: flex;
    flex-direction: column;
    line-height: 1.3;
    figure {
        margin-bottom: 0.5rem;
        img {
            border-radius: 4px;;
        }
    }
    h1 {
        font-size: 1.1rem;
        font-weight: 600;
    }
    p.state {
        font-size: 0.8rem;
        color: var(--grey-400);
    }
`;

export default MyFundingItem;