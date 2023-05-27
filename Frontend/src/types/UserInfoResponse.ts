/**
 * fetchUSerInfo API Response
 */
interface UserInfoResponse {
    nickname?: string;
    fundingCount?: number;
    followerCount?: number;
    followingCount?: number;
    isFollowing?: boolean;
    userImage?: string;
}

export default UserInfoResponse;