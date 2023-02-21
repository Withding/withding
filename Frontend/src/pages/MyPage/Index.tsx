import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./Main/Main";
import MyProfile from "./MyProfile/MyProfile";

function Index() {
    return (
        <React.Fragment>
            <Routes>
                <Route path="main" element={<Main />} />
                <Route path="myprofile" element={<MyProfile />} />
            </Routes>
        </React.Fragment>
    );
}

export default Index;