import InfinityScroll from "@/components/common/InfinityScroll";
import React from "react";
import { useInfiniteQuery } from "react-query";
import UserRelationList from "./UserRelationList";
import { useParams } from "react-router-dom";
import { UserRelationListResponse } from "@/types/UserRelationList";
import fetchUserFollowingList from "@/utils/RequestApis/users/fetchUserFollowingList";

/**
 * 팔로잉 리스트
 * @returns 
 */
function FollowingList() {
    const { userId } = useParams<{ userId: string }>();
    // 해당 유저 팔로우 리스트
    const {
        data,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery<UserRelationListResponse>({
        queryKey: ["userFollowingList", userId],
        queryFn: ({ pageParam = 1 }) => fetchUserFollowingList({
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

export default FollowingList;