import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Make from "./Make/Make";

function Index() {
    return (
        <React.Fragment>
            <Routes>
                <Route path="/" element={<Navigate to="/make" />} />
                <Route path="make" element={<Make />} />
            </Routes>
        </React.Fragment>
    );
}

export default Index;