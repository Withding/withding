import customAxios from "@/utils/customAxios";
import { AxiosResponse } from "axios";

/**
 * 이메일 로그인 API
 * @param props.email - 이메일
 * @param props.password - 비밀번호
 * @returns 
 */
function fetchUserInfo({ 
    email, password
}: {
    email: string;
    password: string;
}): Promise<AxiosResponse> {
    const axios = customAxios();
    return axios({
        method: "POST",
        url: "/login",
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            email,
            password
        },
    });
}

export default fetchUserInfo;