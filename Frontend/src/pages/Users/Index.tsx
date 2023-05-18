import React from "react";
import { Route, Routes } from "react-router-dom";
import UserInfo from "./UserInfo/UserInfo";

/**
 * /users 페이지
 * @returns 
 */
function Index() {
    return (
        <Routes>
            <Route path="/:userId" element={<UserInfo />} />
        </Routes>
    );
}

export default Index;