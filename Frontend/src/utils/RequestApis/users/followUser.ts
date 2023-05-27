import httpClient from "@/utils/httpClient";
import { AxiosResponse } from "axios";

/**
 * 유저 팔로우 하는 API
 * @param userId - 팔로우 할 유저 아이디
 * @returns 
 */
function followUser(userId: number): Promise<AxiosResponse> {
    return httpClient({
        url: `/user/follow?userId=${userId}`,
        method: "POST",
    });
}

export default followUser;