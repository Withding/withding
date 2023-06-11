import UserFundingListResponse from "@/types/UserFundingListResponse";
import httpClient from "@/utils/httpClient";


function fetchUserFundingList(userID: number): Promise<UserFundingListResponse> {
    return httpClient({
        url: `/projects?userNum=${userID}`,
        method: "GET",
    }).then((response): UserFundingListResponse => response.data);
}

export default fetchUserFundingList;