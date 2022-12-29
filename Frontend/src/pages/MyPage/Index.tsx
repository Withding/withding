import React from "react";
import { Route, Routes } from "react-router-dom";

function Index() {
    return (
        <React.Fragment>
            <Routes>
                <Route path="main" element={<h1>main</h1>} />
            </Routes>
        </React.Fragment>
    );
}

export default Index;