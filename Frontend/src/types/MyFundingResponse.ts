import Funding from "./Funding";

/**
 * fetchMyFunding API Response
 */
interface MyFundingResponse {
    fundingCount: number;
    lastPage: number;
    fundingList: Funding[];
    currentPage: number;
}

export default MyFundingResponse;