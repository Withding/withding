import useUserInfoContext from "@/hooks/useUserInfoContext";
import { css } from "@emotion/react";
import React from "react";

function ProfileImage() {
    const { userImage } = useUserInfoContext();
    return (
        <figure css={style}>
            <img src={userImage} alt="프로필 이미지" />
        </figure>
    );
}

const style = css`
    
    img {
        background-color: var(--grey-200);
        border-radius: 100%;
        width: 100%;
        height: 100%;
        object-fit: cover;
        
    }
    @media screen and (min-width: 1096px) {
        width: 8rem;
        height: 8rem;
    }

    @media screen and (max-width: 1095px) {
        width: 6rem;
        height: 6rem;
    }
`;

export default ProfileImage;