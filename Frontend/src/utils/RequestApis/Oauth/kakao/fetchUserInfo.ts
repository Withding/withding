import  User  from "@/types/User";
import httpClient from "@/utils/httpClient";

/**
 * 카카오 로그인 이후 유저 정보 가져오는 API
 * @param accessToken 
 * @returns 
 */
function fetchUserInfo(accessToken: string): Promise<User> {
    return httpClient({
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