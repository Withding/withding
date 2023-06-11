import UserInfoResponse from "@/types/UserInfoResponse";
import httpClient from "@/utils/httpClient";

/**
     * 특정 유저의 정보를 요청하는 API
     * @param userId - 유저 아이디
     * @returns 
     */

function fetchUserInfo(userId: number): Promise<UserInfoResponse> {
    return httpClient({
        url: `/user?userId=${userId}`,
        method: "GET",
    }).then((response): UserInfoResponse => response.data);
}

export default fetchUserInfo;