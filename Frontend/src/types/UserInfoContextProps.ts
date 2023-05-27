import UserInfoResponse from "./UserInfoResponse";

interface UserInfoContextProps extends UserInfoResponse {
    onFollow: () => void;
    onUnfollow: () => void;
}

export default UserInfoContextProps;
