import httpClient from "@/utils/httpClient";

/**
     * 특정 유저의 정보를 요청하는 API
     * @param userId - 유저 아이디
     * @returns 
     */

function fetchUserInfo(userId: number) {
    return httpClient({
        url: `/users/userId=${userId}`,
        method: "GET",
    });
}

export default fetchUserInfo;