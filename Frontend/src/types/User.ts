/**
 * 유저 정보
 */
interface User {
    nickName?: string;
    image?: string;
    accessToken?: string;
    isLogin?: boolean;
    loginType?: number;
}


export default User;