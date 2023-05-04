import  User  from "@/types/User";
/**
 * 로그인 여부를 나타내는 hook
 * @returns isLogin 로그인 여부
 */
export default function useIsLogin() {
    const user: User = JSON.parse(localStorage.getItem("user") || "{}");
    const { isLogin } = user;
    return isLogin ?? false;
}
