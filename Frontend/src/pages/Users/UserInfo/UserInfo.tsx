import React from "react";
import { useParams } from "react-router-dom";

/**
 * /users/:userId 
 * 특정 유저 정보 페이지
 * @returns 
 */
function UserInfo() {
    const { userId } = useParams<{ userId: string }>();
    return (
        <div>{userId}</div>
    );
}

export default UserInfo;