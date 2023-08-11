import InfinityScroll from "@/components/common/InfinityScroll";
import fetchUserFollowList from "@/utils/RequestApis/users/fetchUserFollowList";
import React from "react";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";
import UserRelationList from "./UserRelationList";
import { UserRelationListResponse } from "@/types/UserRelationList";

/**
 * 팔로우 목록 리스트
 * @returns 
 */
function FollowList() {
    const { userId } = useParams<{ userId: string }>();
    // 해당 유저 팔로우 리스트
    const {
        data,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery<UserRelationListResponse>({
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
            <UserRelationList
                list={data?.pages.map((page) => page.list).flat()}
            />
        </InfinityScroll>
    );
}

export default FollowList;