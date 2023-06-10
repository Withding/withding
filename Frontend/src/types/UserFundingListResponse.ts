import UserFunding from "./UserFunding";

interface UserFundingListResponse {
    fundingList: UserFunding[];
    lastPage: number,
    currentPage: number
}

export default UserFundingListResponse;