import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./Main/Main";
import MyProfile from "./MyProfile/MyProfile";
import MyFunding from "./MyFunding/MyFunding";

function Index() {
    return (
        <React.Fragment>
            <Routes>
                <Route path="main" element={<Main />} />
                <Route path="myprofile" element={<MyProfile />} />
                <Route path="myfunding" element={<MyFunding />} />
            </Routes>
        </React.Fragment>
    );
}

export default Index;