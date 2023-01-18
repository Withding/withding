import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Intro from "./Intro/Intro";

function Index() {
    return (
        <React.Fragment>
            <Routes>
                <Route path="/" element={<Navigate to="/intro" />} />
                <Route path="intro" element={<Intro />} />
            </Routes>
        </React.Fragment>
    );
}

export default Index;