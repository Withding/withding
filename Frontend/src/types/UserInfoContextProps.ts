import UserFunding from "./UserFunding";
import UserInfoResponse from "./UserInfoResponse";

interface UserInfoContextProps {
    userInfo: UserInfoResponse & {
        onFollow: (userId: number) => void;
        onUnfollow: (userId: number) => void;
    }
    list: {
        fundingList?: UserFunding[];
        lastPage: number;
        isFetchingNextPage: boolean;
        fetchNextPage: () => void;
        hasNextPage?: boolean; 
    }
}

export default UserInfoContextProps;
