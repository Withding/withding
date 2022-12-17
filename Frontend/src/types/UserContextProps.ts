/**
 * 유저 정보
 */
interface UserContextProps {
    isLogin: boolean;
    nickname: string;
    profileImage: string;
    onChangeNickname: (nickname: string) => void;
    onChangeProfileImage: (profileImage: string) => void;
    onChangeIsLogin: (isLogin: boolean) => void;
    onResetUser: () => void;
}

export default UserContextProps;