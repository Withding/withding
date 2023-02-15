import React from "react";
import { useMediaQuery } from "react-responsive";
import Logout from "../Logout";
import Profile from "../Profile/Profile";
import { useQuery } from "react-query";
import fetchMakerInfo from "@/utils/RequestApis/mypage/fetchMakerInfo";

/**
 * 메이커 탭 클릭시 보여주는 화면
 * @returns 
 */
function MakerContext() {
    const isMobile = useMediaQuery({ query: "(max-width: 1095px)" });
    const { data } = useQuery(["fetchMakerInfo"], () => fetchMakerInfo(), {
        suspense: false,
        useErrorBoundary: false
    });
    return (
        <React.Fragment>
            <Profile
                isEditProfileImage={false}
                type={1}
                followerCount={data?.followerCount}
            />
            {isMobile && <Logout />}
        </React.Fragment>
    );
}

export default MakerContext;