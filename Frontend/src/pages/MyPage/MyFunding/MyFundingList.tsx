import fetchMyFunding from "@/utils/RequestApis/funding/fetchMyFunding";
import React from "react";
import { useInfiniteQuery } from "react-query";
import MyFundingItem from "./MyFundingItem";
import { css } from "@emotion/react";

function MyFundingList() {
    const { data, hasNextPage, fetchNextPage }
        = useInfiniteQuery(["fetchMyFundingList"], ({ pageParam = 1 }) => fetchMyFunding({
            page: pageParam
        }), {
            getNextPageParam: (lastPage, allPage) => {
                if (lastPage.currentPage < lastPage.lastPage) return lastPage.currentPage + 1;
            }
        });
    const fundingList = data?.pages.map((page) => page.fundingList).flat();
    return (
        <ul css={style}>
            {fundingList?.map((item) => (
                <MyFundingItem
                    key={item.id}
                    {...item}
                />
            ))}
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

export default MyFundingList;