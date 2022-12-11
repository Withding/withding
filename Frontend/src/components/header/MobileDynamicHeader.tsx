import React from "react";
import { useLocation } from "react-router-dom";
import LoginHeader from "./PageHeaders/LoginHeader";

/**
 * Mobile Dynamic Header Component
 * @returns 
 */
function MobileDynamicHeader() {
    const { pathname } = useLocation();
    const isLoginPage = pathname.startsWith("/signin");
    const isSignupPage = pathname.startsWith("/signup");
    return (
        <React.Fragment>
            {isLoginPage && <LoginHeader />}
            {isSignupPage && <LoginHeader />}
        </React.Fragment>
    );
}
export default MobileDynamicHeader;