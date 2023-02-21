import EmailSignupType from "@/types/EmailSignupType";
import customAxios from "@/utils/customAxios";
import { AxiosResponse } from "axios";

/**
 * 회원가입시 요청 API
 * @param user - 이메일, 이름, 비밀번호, secretKey
 * @returns 
 */

function requestSignup(user: EmailSignupType): Promise<AxiosResponse> {
    const axios = customAxios();
    return axios({
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