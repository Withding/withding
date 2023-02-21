import customAxios from "@/utils/customAxios";
/**
 * 마이페이지 메이커 정보 가져오는 API
 * @returns 
 */
function fetchMakerInfo(): Promise<{
    followerCount: number
}> {
    const axios = customAxios();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = user?.accessToken;
    return axios({
        url: "/user/mypage/maker",
        method: "GET",
        headers: {
            "authorization": accessToken,
        },
    }).then(res => res.data);
}

export default fetchMakerInfo;