import React from "react";
import { useLocation } from "react-router-dom";
import LoginHeader from "./PageHeaders/LoginHeader";
import MyPageMainHeader from "./PageHeaders/MyPageMainHeader";

/**
 * Mobile Dynamic Header Component
 * @returns 
 */
function MobileDynamicHeader() {
    const { pathname } = useLocation();
    const isLoginPage = pathname.startsWith("/signin");
    const isSignupPage = pathname.startsWith("/signup");
    const isMyPageMain = pathname === ("/mypage/main");
    return (
        <React.Fragment>
            {isLoginPage && <LoginHeader />}
            {isSignupPage && <LoginHeader />}
            {isMyPageMain && <MyPageMainHeader />}
        </React.Fragment>
    );
}
export default MobileDynamicHeader;