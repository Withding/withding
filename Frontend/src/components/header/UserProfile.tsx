import UserContext from "@/store/UserContext";
import { css } from "@emotion/react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

/**
 * 헤더에 들어갈 유저 프로필 컴포넌트
 * @returns 
 */
function UserProfile() {
    const { nickName } = useContext(UserContext);
    const navigate = useNavigate();
    return (
        <div css={style}>
            <p onClick={() => navigate("/mypage/main")}>{nickName}</p>
        </div>
    );
}

const style = css`
    p {
        cursor: pointer;
    }
`;

export default UserProfile;