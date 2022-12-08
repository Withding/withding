import React from "react";
import { useLocation } from "react-router-dom";
import MainHeader from "./MobileHeaders/MainHeader";

function MobileDynamicHeader() {
    const { pathname } = useLocation();
    const isMainPage = pathname.startsWith("/main");
    const isLoginPage = pathname.startsWith("/login");
    return (
        <React.Fragment>
            {isMainPage && <MainHeader />}
            {isLoginPage && <div>login</div>}
        </React.Fragment>
    );
}

export default MobileDynamicHeader;