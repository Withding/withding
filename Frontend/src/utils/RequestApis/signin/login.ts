import User from "@/types/User";
import httpClient from "@/utils/httpClient";

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
}): Promise<User> {
    return httpClient({
        method: "POST",
        url: "/login",
        data: {
            email,
            password
        },
    }).then((res) => res.data);
}

export default fetchUserInfo;