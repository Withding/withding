import fetchMyFunding from "@/utils/RequestApis/funding/fetchMyFunding";
import React from "react";
import { useInfiniteQuery } from "react-query";
import InfinityScroll from "@/components/common/InfinityScroll";
import UserFundingList from "@/components/common/UserFunding/UserFundingList";
import UserFundingItem from "@/components/common/UserFunding/UserFundingItem";

function MyFundingList() {
    const { data, hasNextPage, fetchNextPage, isFetchingNextPage }
        = useInfiniteQuery(["fetchMyFundingList"], ({ pageParam = 1 }) => fetchMyFunding({
            page: pageParam
        }), {
            getNextPageParam: (lastPage, allPage) => {
                if (lastPage.currentPage < lastPage.lastPage) return lastPage.currentPage + 1;
            }
        });
    const fundingList = data?.pages.map((page) => page.fundingList).flat();
    return (
        <InfinityScroll
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
        >
            <UserFundingList>
                {fundingList?.map((item) => (
                    <UserFundingItem
                        key={item.id}
                        title={item.title}
                        imgSrc={item.image}
                        alt={item.id.toString()}
                        url={`/project/make?project=${item.id}`}
                        state={item.state}
                        underText={"스튜디오 바로가기"}
                    />
                ))}
            </UserFundingList>
        </InfinityScroll>
    );
}

export default MyFundingList;