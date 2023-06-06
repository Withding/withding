import fetchUserInfo from "@/utils/RequestApis/users/fetchUserInfo";
import { css } from "@emotion/react";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import Header from "./Header";
import UserInfoContext from "@/store/UserInfoContext";
import UserInfoResponse from "@/types/UserInfoResponse";
import followUser from "@/utils/RequestApis/users/followUser";
import unfollowUser from "@/utils/RequestApis/users/unfollowUser";
import Content from "./Content";

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

    const { mutate: onFollow } = useMutation(
        () => followUser(Number(userId)),
        {
            onSettled: () => {
                queryClient.invalidateQueries("userInfo");
            }
        }
    );

    const { mutate: onUnfollow } = useMutation(
        () => unfollowUser(Number(userId)),
        {
            onSettled: () => {
                queryClient.invalidateQueries("userInfo");
            }
        }
    );

    return (
        <UserInfoContext.Provider value={{
            ...data,
            onFollow: onFollow,
            onUnfollow: onUnfollow,
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