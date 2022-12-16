import axios, { AxiosResponse } from "axios";

function fetchKakaoAuthCode(code: string): Promise<AxiosResponse> {
    return axios({
        url: "https://kauth.kakao.com/oauth/kakao",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        data: {
            grant_type: "authorization_code",
            client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
            redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
            code: code
        }
    }).then(res => res.data);
}

export default fetchKakaoAuthCode;