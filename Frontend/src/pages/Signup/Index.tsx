import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./Signup";

function Index() {
    return (
        <Routes>
            <Route path="/" element={<Signup />} />
        </Routes>
    );
}

export default Index;