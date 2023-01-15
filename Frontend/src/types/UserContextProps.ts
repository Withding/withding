import User from "./User";

/**
 * 유저 정보
 */
interface UserContextProps {
    isLogin: boolean;
    loginType: number;
    nickName: string;
    image: string;
    onChangeUserInfo: (user: User) => void,
    onChangeProfileImage: (image: string) => void
    onResetUser: () => void;
}

export default UserContextProps;