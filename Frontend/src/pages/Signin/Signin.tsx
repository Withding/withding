import React from "react";
import NormalLogin from "./NormalLogin";

import OauthLoginButtons from "../../components/common/OauthButton/OauthLoginButtons";
import SignupMent from "./SignupMent";
import SignTitle from "../../components/common/SignTitle";
import SignWrapper from "../../components/common/SignWrapper";

/**
 * Sign in Main Component 
 * @returns 
 */
function Index() {
    return (
        <SignWrapper>
            <SignTitle title={"로그인"} />
            <NormalLogin />
            <OauthLoginButtons />
            <SignupMent />
        </SignWrapper>
    );
}

export default Index;