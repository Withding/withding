import ContentInner from "@/components/common/ContentInner";
import { css } from "@emotion/react";
import React from "react";
import ProfileImage from "./ProfileImage";
import UserInfoDetail from "./UserInfoDetail";

/*
    UserInfo Header 컴포넌트
*/
function Header() {
    return (
        <header css={style}>
            <ContentInner
                className="header-inner"
            >
                <ProfileImage />
                <UserInfoDetail />
            </ContentInner>
        </header>
    );
}

const style = css`
    width: 100%;
    height: 12rem;
    /* padding-top: 1rem; */
    border-top: 1px solid var(--grey-200);
    border-bottom: 1px solid var(--grey-200);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;


    .header-inner {
        display: flex;
        align-items: center;
        height: 100%;
    }

    @media screen and (min-width: 1096px) {
        figure {
            margin-right: 3rem;
        }
        .header-inner {
            flex-direction: row;
            
        }
        
    }

    @media screen and (max-width: 1095px) {
        height: 18rem;
        padding-top: 1rem;
        .header-inner {
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
    }
`;

export default Header;