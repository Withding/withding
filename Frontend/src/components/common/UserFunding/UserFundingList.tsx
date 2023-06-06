import { css } from "@emotion/react";
import React from "react";

interface UserFundingListProps {
    children: React.ReactNode;
}

/**
 * 유저 펀딩 List
 * @returns 
 */
function UserFundingList(props: UserFundingListProps) {
    return (
        <ul css={style}>
            {props.children}
        </ul>
    );
}

const style = css`
    width: 100%;
    display: flex;
    margin-top: 1rem;
    @media screen and (min-width: 1096px) {
        flex-wrap: wrap;
        justify-content: space-around;
        li {
            max-width: 30%;
            margin-bottom: 0.5rem;
        }
    }

    @media screen and (max-width: 1095px) {
        flex-direction: column;
        padding: 0 1rem 0 1rem;
        li {
            margin-bottom: 1rem;
        }
    }
`;

export default UserFundingList;