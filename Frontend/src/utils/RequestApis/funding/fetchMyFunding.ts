import MyFundingResponse from "@/types/MyFundingResponse";
import httpClient  from "@/utils/httpClient";
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
    return httpClient({
        url: `/myprojects?page=${page}&cursor=${cursor}&count=${count}`,
        method: "GET",
    }).then(res => res.data);
}

export default fetchMyFunding;