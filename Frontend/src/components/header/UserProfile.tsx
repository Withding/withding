import UserContext from "@/store/UserContext";
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
        <div>
            <p onClick={() => navigate("/mypage/main")}>{nickName}</p>
        </div>
    );
}

export default UserProfile;