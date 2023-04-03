import httpClient from "@/utils/httpClient";
/**
 * 마이페이지 메이커 정보 가져오는 API
 * @returns 
 */
function fetchMakerInfo(): Promise<{
    followerCount: number
}> {
    return httpClient({
        url: "/user/mypage/maker",
        method: "GET",
    }).then(res => res.data);
}

export default fetchMakerInfo;