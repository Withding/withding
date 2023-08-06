
interface Follow {
    follower: number;
    relation: boolean,
    userId: number,
}

interface UserFollowListResponse {
    follows: Follow[],
    lastPage: number,
    currentPage: number,
}

export default UserFollowListResponse;