import { css } from "@emotion/react";
import React from "react";
import MyFundingItem from "./MyFundingItem";
import Funding from "@/types/Funding";
/**
 * 내가 작성한 펀딩 목록들
 */
function MyFundingList(props: {
    list?: Funding[]
}) {
    return (
        <ul
            css={style}
        >
            {props.list?.map((item) => (
                <MyFundingItem
                    key={item.id}
                    {...item}
                />
            ))}
        </ul>
    );
}

const style = css`
    display: inline-flex;
    list-style-position: inside;
    overflow-x: scroll;
    width: 100%;
    margin-top: 1rem;
    li {
        min-width: 20%;
        margin-right: 0.5rem;
        height: auto;
    }

    @media screen and (max-width: 1095px) {
        scrollbar-width: none;
        
    }
`;

export default MyFundingList;