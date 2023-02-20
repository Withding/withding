import MyFundingResponse from "@/types/MyFundingResponse";
import customAxios from "@/utils/customAxios";
/**
 * 내 펀딩 목록 가져오는 API
 * @returns 
 */
function fetchMyFunding({
    page = 1,
    cursor= "",
    count = 6
}: {
    page?: number;
    cursor?: string;
    count?: number;
}): Promise<MyFundingResponse> {
    const axios = customAxios();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = user?.accessToken;
    return axios({
        url: `/myprojects?page=${page}&cursor=${cursor}&count=${count}`,
        method: "GET",
        headers: {
            "authorization": accessToken,
        },
    }).then(res => res.data);
}

export default fetchMyFunding;