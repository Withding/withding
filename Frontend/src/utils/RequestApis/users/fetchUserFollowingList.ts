import { UserRelationListResponse } from "@/types/UserRelationList";
import httpClient from "@/utils/httpClient";


interface fetchUserFollowListProps {
    userId: number,
    page: number
}


/**
 * 
 * @param obj.userId - 유저 고유 번호
 * @param obj.page - 페이지 번호
 */
function fetchUserFollowingList({
    userId,
    page = 1 
}: fetchUserFollowListProps): Promise<UserRelationListResponse> {
    return httpClient({
        url: `/users/${userId}/followers?page=${page}`,
        method: "GET",
    }).then((response): UserRelationListResponse => response.data);
}

export default fetchUserFollowingList;