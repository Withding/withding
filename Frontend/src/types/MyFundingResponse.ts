import UserFunding from "./UserFunding";

/**
 * fetchMyFunding API Response
 */
interface MyFundingResponse {
    fundingCount: number;
    lastPage: number;
    fundingList: UserFunding[];
    currentPage: number;
}

export default MyFundingResponse;