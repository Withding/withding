import InfinityScroll from "@/components/common/InfinityScroll";
import UserFollowListResponse from "@/types/UserFollowListResponse";
import fetchUserFollowList from "@/utils/RequestApis/users/fetchUserFollowList";
import React from "react";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";

function FollowList() {
    const { userId } = useParams<{ userId: string }>();
    // 해당 유저 팔로우 리스트
    const {
        data,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery<UserFollowListResponse>({
        queryKey: ["userFollowList", userId],
        queryFn: ({ pageParam = 1 }) => fetchUserFollowList({
            userId: Number(userId),
            page: pageParam,
        }),
        getNextPageParam: (lastPage, allPage) => {
            if (lastPage.currentPage < lastPage.lastPage) return lastPage.currentPage + 1;
        }
    });

    return (
        <InfinityScroll
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
        >

        </InfinityScroll>
    );
}

export default FollowList;