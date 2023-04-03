import MyPageSupport from "@/types/MyPageSupport";
import  httpClient  from "@/utils/httpClient";
/**
 * 마이페이지 서포터 정보 가져오는 API
 * @returns 
 */
function fetchSupportInfo(): Promise<MyPageSupport> {
    return httpClient({
        url: "/user/mypage/supporter",
        method: "GET",
    }).then(res => res.data);
}

export default fetchSupportInfo;