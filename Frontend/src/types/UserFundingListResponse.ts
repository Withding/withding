import UserFunding from "./UserFunding";

interface UserFundingListResponse {
    list: UserFunding[];
    lastPage: number,
    currentPage: number
}

export default UserFundingListResponse;