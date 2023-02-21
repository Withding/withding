import User from "@/types/User";
import customAxios from "@/utils/customAxios";

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
    }).then((res) => res.data);
}

export default fetchUserInfo;