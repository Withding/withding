import UserContext from "@/store/UserContext";
import React, { useContext } from "react";

/**
 * 헤더에 들어갈 유저 프로필 컴포넌트
 * @returns 
 */
function UserProfile() {
    const { nickname } = useContext(UserContext);
    return (
        <div>
            <p>{nickname}</p>
        </div>
    );
}

export default UserProfile;