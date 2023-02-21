import MyPageSupport from "@/types/MyPageSupport";
import customAxios from "@/utils/customAxios";
/**
 * 마이페이지 서포터 정보 가져오는 API
 * @returns 
 */
function fetchSupportInfo(): Promise<MyPageSupport> {
    const axios = customAxios();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = user?.accessToken;
    return axios({
        url: "/user/mypage/supporter",
        method: "GET",
        headers: {
            "authorization": accessToken,
        },
    }).then(res => res.data);
}

export default fetchSupportInfo;