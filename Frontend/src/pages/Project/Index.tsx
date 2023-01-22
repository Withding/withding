import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Intro from "./Intro/Intro";
import Make from "./Make/Make";

function Index() {
    return (
        <React.Fragment>
            <Routes>
                <Route path="/" element={<Navigate to="/project/intro" />} />
                <Route path="intro" element={<Intro />} />
                <Route path="make" element={<Make />} />
            </Routes>
        </React.Fragment>
    );
}

export default Index;