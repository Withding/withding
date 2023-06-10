import UserInfoResponse from "./UserInfoResponse";

interface UserInfoContextProps {
    userInfo: UserInfoResponse & {
        onFollow: () => void;
        onUnfollow: () => void;
    }
    
}

export default UserInfoContextProps;
