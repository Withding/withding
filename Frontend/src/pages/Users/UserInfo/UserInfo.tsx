import fetchUserInfo from "@/utils/RequestApis/users/fetchUserInfo";
import { css } from "@emotion/react";
import React from "react";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import Header from "./Header";
import UserInfoContext from "@/store/UserInfoContext";
import UserInfoResponse from "@/types/UserInfoResponse";
import followUser from "@/utils/RequestApis/users/followUser";
import unfollowUser from "@/utils/RequestApis/users/unfollowUser";
import Content from "./Content";
import UserFundingListResponse from "@/types/UserFundingListResponse";
import fetchUserFundingList from "@/utils/RequestApis/users/fetchUserFundingList";
/**
 * /users/:userId 
 * 특정 유저 정보 페이지
 * @returns 
 */
function UserInfo() {
    const { userId } = useParams<{ userId: string }>();
    const queryClient = useQueryClient();

    const { data } = useQuery<UserInfoResponse>({
        queryKey: ["userInfo", userId],
        queryFn: () => fetchUserInfo(Number(userId)),
    });

    // 해당 유저 펀딩 리스트
    const { data: fundingList, hasNextPage, fetchNextPage, isFetchingNextPage }
        = useInfiniteQuery<UserFundingListResponse>({
            queryKey: ["userFundligList", userId],
            queryFn: ({ pageParam = 1 }) => fetchUserFundingList({
                userNum: Number(userId),
                page: pageParam,
            }),
            getNextPageParam: (lastPage, allPage) => {
                if (lastPage.currentPage < lastPage.lastPage) return lastPage.currentPage + 1;
            }
        });

    const { mutate: onFollow } = useMutation(
        (userId: number) => followUser(userId),
        {
            onSettled: () => {
                queryClient.invalidateQueries("userInfo");
            }
        }
    );

    const { mutate: onUnfollow } = useMutation(
        (userId: number) => unfollowUser(userId),
        {
            onSettled: () => {
                queryClient.invalidateQueries("userInfo");
            }
        }
    );
    return (
        <UserInfoContext.Provider value={{
            userInfo: {
                ...data,
                onFollow: onFollow,
                onUnfollow: onUnfollow
            },
            list: {
                fundingList: fundingList?.pages.map((page) => page.fundingList).flat(),
                hasNextPage: hasNextPage,
                fetchNextPage: fetchNextPage,
                isFetchingNextPage: isFetchingNextPage,
                lastPage: 0
            }
        }}>
            <div css={style}>
                <Header />
                <Content />
            </div>
        </UserInfoContext.Provider>

    );
}

const style = css`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export default UserInfo;