import fetchUserInfo from "@/utils/RequestApis/users/fetchUserInfo";
import { css } from "@emotion/react";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Header from "./Header";
import UserInfoContext from "@/store/UserInfoContext";
import UserInfoResponse from "@/types/UserInfoResponse";

/**
 * /users/:userId 
 * 특정 유저 정보 페이지
 * @returns 
 */
function UserInfo() {
    const { userId } = useParams<{ userId: string }>();

    const { data } = useQuery<UserInfoResponse>({
        queryKey: ["userInfo", userId],
        queryFn: () => fetchUserInfo(Number(userId)),
    });

    return (
        <UserInfoContext.Provider value={{
            ...data
        }}>
            <div css={style}>
                <Header />
                {userId}
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