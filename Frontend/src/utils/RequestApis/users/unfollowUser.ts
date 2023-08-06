import httpClient from "@/utils/httpClient";
import { AxiosResponse } from "axios";

/**
 * 유저 언팔로우 하는 API
 */
function unfollowUser(userId: number): Promise<AxiosResponse> {
    return httpClient({
        url: `/users/${userId}/follow`,
        method: "DELETE",
    });
}

export default unfollowUser;