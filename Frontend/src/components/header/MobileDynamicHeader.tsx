import React from "react";
// import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";

import LoginHeader from "./PageHeaders/LoginHeader";
// import MainHeader from "./headers/SearchHeader";
// import BaseProps from "../types/BaseProps";

function MobileDynamicHeader() {
    // const isMobile = useMediaQuery({ query: "(max-width: 1095px)" });
    const { pathname } = useLocation();
    const isLoginPage = pathname.startsWith("/login");
    return (
        <React.Fragment>
            {isLoginPage && <LoginHeader />}
        </React.Fragment>
    );
}
export default MobileDynamicHeader;