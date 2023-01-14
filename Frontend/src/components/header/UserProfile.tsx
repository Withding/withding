import UserContext from "@/store/UserContext";
import { css } from "@emotion/react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

/**
 * 헤더에 들어갈 유저 프로필 컴포넌트
 * @returns 
 */
function UserProfile() {
    const { image } = useContext(UserContext);
    const navigate = useNavigate();
    return (
        <figure css={style} onClick={() => navigate("/mypage/main")}>
            <img src={image} alt="유저 프로필 이미지" />
        </figure >
    );
}

const style = css`
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    img {
        border-radius: 999px;
    }
`;

export default UserProfile;