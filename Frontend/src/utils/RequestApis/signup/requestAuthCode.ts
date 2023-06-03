import httpClient from "@/utils/httpClient";
import { AxiosResponse } from "axios";

/**
 * 회원가입시 인증번호 요청 API
 * @param email - 이메일
 * @returns 
 */

function requestAuthCode(email : string): Promise<AxiosResponse> {
    return httpClient({
        method: "GET",
        url: `/user/auth/email?email=${email}`,
    }).then((res) => res.data);
}

export default requestAuthCode;