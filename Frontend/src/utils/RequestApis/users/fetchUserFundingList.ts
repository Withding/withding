import UserFundingListResponse from "@/types/UserFundingListResponse";
import httpClient from "@/utils/httpClient";

interface fetchUserFundingListProps {
    userNum: number,
    page: number,
    cursor?: string,
    count?: number
}


/**
 * 
 * @param obj.userNum - 유저 고유 번호
 * @param obj.count - 한번에 가져올 개수
 * @param obj.page - 페이지 번호
 * @param obj.cursor - 커서 
 * @returns 
 */
function fetchUserFundingList({
    userNum,
    cursor = "",
    count = 6,
    page = 1
}: fetchUserFundingListProps): Promise<UserFundingListResponse> {
    return httpClient({
        url: `/projects?userNum=${userNum}&cursor=${cursor}&count=${count}&page=${page}`,
        method: "GET",
    }).then((response): UserFundingListResponse => response.data);
}

export default fetchUserFundingList;