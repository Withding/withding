import Funding from "./UserFunding";

/**
 * FundingList
 * @interface FundingList
 * @property {number} fundingCount - 펀딩 총 갯수
 * @property {number} lastPage - 마지막 페이지
 */
interface FundingList {
    fundingCount: number;
    lastPage: number;
    fundingList: Funding[];
}

export default FundingList;