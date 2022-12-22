import customAxios from "@/utils/customAxios";
import { AxiosResponse } from "axios";

/**
 * 이메일 인증코드가 유효한지 확인하는 API
 * @param email - 이메일
 * @param authCode - 인증코드
 * @returns 
 */

function requestAuthCode(email: string,authCode : string): Promise<{secretKey: string}> {
    const axios = customAxios();
    return axios({
        method: "POST",
        url: `/user/auth/check`,
        data: {
            email,
            authCode
        }
    }).then((res) => res.data);
}

export default requestAuthCode;