import React, { useCallback } from "react";
import { useLocation } from "react-router-dom";
import DefaultHeader from "./PageHeaders/DefaultHeader";
import LoginHeader from "./PageHeaders/LoginHeader";
import MyPageMainHeader from "./PageHeaders/MyPageMainHeader";
import SearchHeader from "./PageHeaders/SearchHeader";

/**
 * Mobile Dynamic Header Component
 * @returns 
 */
function MobileDynamicHeader() {
    const { pathname } = useLocation();
    const isMainPage = pathname.startsWith("/main");
    const isLoginPage = pathname.startsWith("/signin");
    const isSignupPage = pathname.startsWith("/signup");
    const isMyPageMain = pathname === ("/mypage/main");
    const getHeader = useCallback(() => {
        if (isMainPage) {
            return <SearchHeader />;
        }
        if (isLoginPage) {
            return <LoginHeader />;
        }
        else if (isSignupPage) {
            return <LoginHeader />;
        }
        else if (isMyPageMain) {
            return <MyPageMainHeader />;
        }
        else {
            return <DefaultHeader />;
        }
    }, [isLoginPage, isMyPageMain, isSignupPage]);

    return (
        <React.Fragment>
            {getHeader()}
        </React.Fragment>
    );
}
export default MobileDynamicHeader;