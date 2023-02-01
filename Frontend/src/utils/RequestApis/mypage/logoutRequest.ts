import customAxios from "@/utils/customAxios";
import { AxiosResponse } from "axios";
/**
 * 로그아웃 API
 * @returns 
 */
function logoutRequest(): Promise<AxiosResponse> {
    const axios = customAxios();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = user?.accessToken;
    return axios({
        url: "/user/logout",
        method: "PUT",
        headers: {
            "authorization": accessToken,
        }
    }).then(res => res.data);
}

export default logoutRequest;