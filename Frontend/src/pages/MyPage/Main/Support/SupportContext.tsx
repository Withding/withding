import React from "react";
import MenuContent from "../MenuContent";
import Profile from "../Profile/Profile";
import Logout from "../Logout";
import { useMediaQuery } from "react-responsive";
import Summary from "./Summary";
import fetchSupportInfo from "@/utils/RequestApis/mypage/fetchSupportInfo";
import { useQuery } from "react-query";
import SupportContext from "@/store/SupportContext";
import DivLine from "../DivLine";

/**
 * 서포터 탭 클릭시 보여주는 화면
 * @returns 
 */
function Support() {
    const isMobile = useMediaQuery({ query: "(max-width: 1095px)" });
    const { data } = useQuery(["fetchSupportInfo"], () => fetchSupportInfo(), {
        suspense: false,
        useErrorBoundary: false
    });

    return (
        <React.Fragment>
            <SupportContext.Provider value={{
                profileImage: data?.profileImage,
                nickName: data?.nickName,
                point: data?.point,
                fundingCount: data?.fundingCount
            }}>
                <Profile
                    isEditProfileImage={true}
                    type={0}
                />
                <MenuContent>
                    <Summary />
                    <DivLine />
                </MenuContent>
                {isMobile && <Logout />}
            </SupportContext.Provider>
        </React.Fragment>
    );
}


export default Support;