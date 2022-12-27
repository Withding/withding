import  User  from "@/types/User";
import customAxios from "@/utils/customAxios";

/**
 * 카카오 로그인 이후 유저 정보 가져오는 API
 * @param accessToken 
 * @returns 
 */
function fetchUserInfo(accessToken: string): Promise<User> {
    const axios = customAxios();
    return axios({
        method: "POST",
        url: "/auth/kakao",
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            accessToken
        },
    }).then((res) => res.data);
}

export default fetchUserInfo;