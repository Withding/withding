import EmailSignupType from "@/types/EmailSignupType";
import httpClient from "@/utils/httpClient";
import { AxiosResponse } from "axios";

/**
 * 회원가입시 요청 API
 * @param user - 이메일, 이름, 비밀번호, secretKey
 * @returns 
 */

function requestSignup(user: EmailSignupType): Promise<AxiosResponse> {
    return httpClient({
        method: "POST",
        url: `/user`,
        data: {
            email: user.email,
            nickName: user.name,
            password: user.password,
            secretKey: user.secretKey
        }
    });
}

export default requestSignup;