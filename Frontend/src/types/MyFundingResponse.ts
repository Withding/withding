import Funding from "./Funding";

/**
 * fetchMyFunding API Response
 */
interface MyFundingResponse {
    fundingCount: number;
    lastPage: number;
    fundingList: Funding[];
}

export default MyFundingResponse;