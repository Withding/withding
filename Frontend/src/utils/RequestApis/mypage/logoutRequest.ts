import httpClient from "@/utils/httpClient";
import { AxiosResponse } from "axios";
/**
 * 로그아웃 API
 * @returns 
 */
function logoutRequest(): Promise<AxiosResponse> {
    return httpClient({
        url: "/user/logout",
        method: "PUT",
    }).then(res => res.data);
}

export default logoutRequest;