import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./Main/Main";

function Index() {
    return (
        <React.Fragment>
            <Routes>
                <Route path="main" element={<Main />} />
            </Routes>
        </React.Fragment>
    );
}

export default Index;