import React from "react";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import LazyImage from "@/components/common/LazyImage";
import FundingTitleState from "./FundingTitleState";

interface UserFundingItemProps {
    title: string;
    imgSrc: string;
    alt?: string;
    url: string;
    underText: string;
    state: string;
}

/**
 * 유저 펀딩 Item
 * @param props.title - 펀딩 제목
 * @param props.imgSrc - 이미지 URI
 * @param props.alt - 이미지 대체 텍스트
 * @param props.url - 클릭시 이동할 URL
 * @param props.underText - 아래에 표시할 텍스트
 * @param props.state - 펀딩 상태
 * @returns 
 */
function UserFundingItem(props: UserFundingItemProps) {
    const navigator = useNavigate();
    return (
        <li css={style}>
            <LazyImage
                src={props.imgSrc}
                alt={props?.alt}
                className="img"
                objectFit="cover"
            />
            <FundingTitleState
                title={props.title}
                state={props.state}
            />
            <section
                className="underText"
                onClick={() => navigator(props.url)}
            >
                <p>{props.underText}</p>
            </section>
        </li>
    );
}

const style = css`
    background-color: white;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--grey-200);
    width: 100%;
    min-height: 23rem;

    & > .img {
        width: 100%;
    }


    & > section {
        width: 100%;
        height: 100%;
        cursor: pointer;
        border-top: 1px solid var(--grey-200);
        display: block;
        padding: 1.5rem;
        p {
            color: var(--grey-500);
            font-weight: 200;
        }
    }

    & > .underText { 
        text-align: center;
    }


    @media screen and (min-width: 1096px) {
        & > .img {
            min-height: 15rem;
            max-height: 15rem;
        }
    }

    @media screen and (max-width: 1095px) {
        & > .img {
            min-height: 12rem;
            max-height: 12rem;
        }
    }
    
`;

export default UserFundingItem;