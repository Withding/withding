import customAxios from "@/utils/customAxios";
import { AxiosResponse } from "axios";

function fetchUserInfo(accessToken: string): Promise<AxiosResponse> {
    const axios = customAxios();
    return axios({
        method: "POST",
        url: "/auth/kakao",
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            accessToken
        }
    }).then((res) => res.data);
}

export default fetchUserInfo;