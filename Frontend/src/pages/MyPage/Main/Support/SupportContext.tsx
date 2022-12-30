import React from "react";
import MenuContent from "../MenuContent";
import Profile from "../Profile/Profile";
import Logout from "../Logout";
import { useMediaQuery } from "react-responsive";
import Summary from "./Summary";

/**
 * 서포터 탭 클릭시 보여주는 화면
 * @returns 
 */
function SupportContext() {
    const profileImage = "http://placehold.it/100x100";
    const isMobile = useMediaQuery({ query: "(max-width: 1096px)" });

    return (
        <React.Fragment>
            <Profile
                profileImage={profileImage}
                isEditProfileImage={true}
                nickName={"누구누"}
                type={0}
            />
            <MenuContent>
                <Summary />
            </MenuContent>
            {isMobile && <Logout />}
        </React.Fragment>
    );
}


export default SupportContext;