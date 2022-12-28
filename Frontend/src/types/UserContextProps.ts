/**
 * 유저 정보
 */
interface UserContextProps {
    isLogin: boolean;
    nickName: string;
    profileImage: string;
    onChangeUserInfo: (
        { nickName, isLogin, profileImage }:
        { nickName: string, isLogin: boolean, profileImage: string}) => void,
    onResetUser: () => void;
}

export default UserContextProps;