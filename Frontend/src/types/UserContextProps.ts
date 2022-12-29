import User from "./User";

/**
 * 유저 정보
 */
interface UserContextProps {
    isLogin: boolean;
    nickName: string;
    profileImage: string;
    onChangeUserInfo: (user: User) => void,
    onResetUser: () => void;
}

export default UserContextProps;